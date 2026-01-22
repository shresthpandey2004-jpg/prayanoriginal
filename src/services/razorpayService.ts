// Razorpay Payment Service - Simplified Version
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface OrderData {
  orderId: string;
  amount: number;
  currency: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

class RazorpayService {
  private keyId: string;

  constructor() {
    // Using working demo test keys
    this.keyId = 'rzp_test_1DP5mmOlF5G5ag';
  }

  // Load Razorpay script with better error handling
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        console.log('Razorpay already loaded');
        resolve(true);
        return;
      }

      // Remove any existing script
      const existingScript = document.querySelector('script[src*="razorpay"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Razorpay script:', error);
        resolve(false);
      };
      
      document.head.appendChild(script);
    });
  }

  // Simplified payment initiation
  async initiatePayment(orderData: OrderData): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('Starting payment process...');
      
      // Load Razorpay script
      const scriptLoaded = await this.loadRazorpayScript();
      if (!scriptLoaded) {
        return {
          success: false,
          error: 'Failed to load payment gateway. Please check your internet connection.'
        };
      }

      // Wait a bit for script to initialize
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!window.Razorpay) {
        return {
          success: false,
          error: 'Payment gateway not available. Please try again.'
        };
      }

      return new Promise((resolve) => {
        const options: RazorpayOptions = {
          key: this.keyId,
          amount: orderData.amount * 100, // Convert to paise
          currency: orderData.currency,
          name: 'PRAYAN Masale',
          description: `Order #${orderData.orderId}`,
          handler: (response: RazorpayResponse) => {
            console.log('Payment successful:', response);
            resolve({ success: true });
          },
          prefill: {
            name: orderData.customerDetails.name,
            email: orderData.customerDetails.email,
            contact: orderData.customerDetails.phone,
          },
          theme: {
            color: '#ea580c',
          },
          modal: {
            ondismiss: () => {
              console.log('Payment cancelled');
              resolve({ success: false, error: 'Payment cancelled by user' });
            },
          },
        };

        try {
          console.log('Creating Razorpay instance...');
          const razorpay = new window.Razorpay(options);
          console.log('Opening payment modal...');
          razorpay.open();
        } catch (error) {
          console.error('Error creating Razorpay instance:', error);
          resolve({ 
            success: false, 
            error: 'Failed to open payment gateway. Please try again.' 
          });
        }
      });

    } catch (error) {
      console.error('Payment initiation error:', error);
      return {
        success: false,
        error: 'Payment failed. Please try again or use Cash on Delivery.'
      };
    }
  }
}

export const razorpayService = new RazorpayService();