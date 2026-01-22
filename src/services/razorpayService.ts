// Razorpay Payment Service
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
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
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
  private keySecret: string;

  constructor() {
    // LIVE Razorpay keys - CAUTION: These will charge real money!
    // For testing, switch to Test keys (rzp_test_xxx)
    this.keyId = 'rzp_live_S71I7EyGmCTqz0';
    this.keySecret = '72Prwbttrlr1ybngPv9dSaOr';
  }

  // Load Razorpay script
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Create Razorpay order (Frontend simulation)
  async createOrder(orderData: OrderData) {
    try {
      // In production, this should call your backend API
      // For now, we'll simulate order creation
      const order = {
        id: `order_${Date.now()}`,
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        currency: orderData.currency,
        status: 'created'
      };

      return {
        success: true,
        order
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create order'
      };
    }
  }

  // Initialize payment
  async initiatePayment(orderData: OrderData): Promise<{ success: boolean; error?: string }> {
    try {
      // Load Razorpay script
      const scriptLoaded = await this.loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Create order
      const orderResult = await this.createOrder(orderData);
      if (!orderResult.success) {
        throw new Error(orderResult.error);
      }

      return new Promise((resolve) => {
        const options: RazorpayOptions = {
          key: this.keyId,
          amount: orderResult.order.amount,
          currency: orderResult.order.currency,
          name: 'PRAYAN Masale',
          description: `Order #${orderData.orderId}`,
          order_id: orderResult.order.id,
          handler: (response: RazorpayResponse) => {
            // Payment successful
            console.log('Payment successful:', response);
            resolve({ success: true });
          },
          prefill: {
            name: orderData.customerDetails.name,
            email: orderData.customerDetails.email,
            contact: orderData.customerDetails.phone,
          },
          notes: {
            address: orderData.customerDetails.address,
          },
          theme: {
            color: '#ea580c', // Orange theme matching website
          },
          modal: {
            ondismiss: () => {
              // Payment cancelled
              resolve({ success: false, error: 'Payment cancelled by user' });
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed'
      };
    }
  }

  // Verify payment (should be done on backend in production)
  verifyPayment(paymentId: string, orderId: string, signature: string): boolean {
    // In production, verify signature on backend using webhook
    // For demo, we'll return true
    console.log('Verifying payment:', { paymentId, orderId, signature });
    return true;
  }
}

export const razorpayService = new RazorpayService();