import { BUSINESS_CONFIG } from '@/config/business';

export interface DeliveryInfo {
  charge: number;
  isFree: boolean;
  area: string;
  estimatedDays: string;
}

export const calculateDeliveryCharge = (pincode: string, orderTotal: number): DeliveryInfo => {
  // Check if free delivery applies
  if (orderTotal >= BUSINESS_CONFIG.delivery.freeDeliveryAbove) {
    return {
      charge: 0,
      isFree: true,
      area: getAreaByPincode(pincode),
      estimatedDays: "2-3 business days"
    };
  }

  // Find specific pincode delivery charge
  const deliveryArea = BUSINESS_CONFIG.delivery.deliveryAreas.find(
    area => area.pincode === pincode
  );

  if (deliveryArea) {
    return {
      charge: deliveryArea.charge,
      isFree: false,
      area: deliveryArea.area,
      estimatedDays: "1-2 business days"
    };
  }

  // Default delivery charge for other areas
  return {
    charge: BUSINESS_CONFIG.delivery.standardDeliveryCharge,
    isFree: false,
    area: "Other Areas",
    estimatedDays: "3-5 business days"
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