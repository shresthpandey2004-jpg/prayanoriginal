import { BUSINESS_CONFIG } from '@/config/business';

export interface DeliveryInfo {
  charge: number;
  isFree: boolean;
  area: string;
  estimatedDays: string;
  reason?: string;
}

export const calculateDeliveryCharge = (pincode: string, orderTotal: number, isFirstOrder: boolean = false): DeliveryInfo => {
  const area = getAreaByPincode(pincode);
  const standardCharge = 40; // Standard delivery charge
  
  // Free delivery only for first order
  if (isFirstOrder) {
    return {
      charge: 0,
      isFree: true,
      area,
      estimatedDays: "2-3 business days",
      reason: "First Order - FREE Delivery"
    };
  }
  
  // Regular delivery charges for subsequent orders
  return {
    charge: standardCharge,
    isFree: false,
    area,
    estimatedDays: "2-3 business days",
    reason: `Delivery Charge: ₹${standardCharge}`
  };
};

export const getAreaByPincode = (pincode: string): string => {
  const deliveryArea = BUSINESS_CONFIG.delivery.deliveryAreas.find(
    area => area.pincode === pincode
  );
  return deliveryArea?.area || "Other Areas";
};

export const isDeliveryAvailable = (pincode: string): boolean => {
  // For now, we deliver everywhere in India
  // You can add restrictions here
  return /^\d{6}$/.test(pincode);
};

export const getEstimatedDeliveryDate = (pincode: string): string => {
  const deliveryInfo = calculateDeliveryCharge(pincode, 0);
  const days = deliveryInfo.estimatedDays.includes("1-2") ? 2 : 
               deliveryInfo.estimatedDays.includes("2-3") ? 3 : 5;
  
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + days);
  
  return deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};