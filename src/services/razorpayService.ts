// Razorpay Payment Service - LIVE PRODUCTION VERSION
// ⚠️ REAL PAYMENTS ENABLED - MONEY WILL BE CHARGED ⚠️
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
  image?: string;
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
  config?: {
    display: {
      blocks: {
        banks: {
          name: string;
          instruments: Array<{
            method: string;
          }>;
        };
      };
      sequence: string[];
      preferences: {
        show_default_blocks: boolean;
      };
    };
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
    // 🚀 MULTIPLE FALLBACK METHODS TO FORCE LIVE MODE
    // Try environment variable first, then hardcoded as fallback
    const envKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const hardcodedKeyId = 'rzp_live_S9hhs3GBHcB4tt';
    
    // Use environment variable if available, otherwise hardcoded
    this.keyId = envKeyId || hardcodedKeyId;
    
    console.log('🚀 RAZORPAY LIVE MODE INITIALIZATION');
    console.log('Environment Key:', envKeyId);
    console.log('Hardcoded Key:', hardcodedKeyId);
    console.log('Using Key:', this.keyId);
    
    // Force live mode verification
    if (this.keyId.startsWith('rzp_live_')) {
      console.log('✅ LIVE MODE CONFIRMED - Key starts with rzp_live_');
      console.log('🎯 If test mode banner still shows, this is a Razorpay backend sync issue');
      console.log('⏰ Usually resolves in 15-30 minutes after key regeneration');
    } else {
      console.error('❌ CRITICAL ERROR: Test key detected!');
      console.error('🔧 Falling back to hardcoded live key...');
      this.keyId = hardcodedKeyId;
    }
    
    // Additional debugging
    console.log('🔍 Final Key ID:', this.keyId);
    console.log('🔍 Key Length:', this.keyId.length);
    console.log('🔍 Is Live Key:', this.keyId.startsWith('rzp_live_'));
  }

  // Load Razorpay script with better error handling and mobile support
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        console.log('✅ Razorpay already loaded');
        resolve(true);
        return;
      }

      console.log('📱 Loading Razorpay script for mobile...');

      // Remove any existing script
      const existingScript = document.querySelector('script[src*="razorpay"]');
      if (existingScript) {
        console.log('🔄 Removing existing Razorpay script');
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = false; // Changed to false for better mobile compatibility
      script.defer = false;
      
      script.onload = () => {
        console.log('✅ Razorpay script loaded successfully');
        // Wait a bit more for mobile browsers
        setTimeout(() => {
          if (window.Razorpay) {
            console.log('✅ Razorpay object available');
            resolve(true);
          } else {
            console.error('❌ Razorpay object not available after load');
            resolve(false);
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Razorpay script:', error);
        resolve(false);
      };
      
      document.head.appendChild(script);
    });
  }

  // Mobile-optimized payment initiation - SIMPLIFIED
  async initiatePayment(orderData: OrderData): Promise<{ success: boolean; error?: string; paymentId?: string; orderId?: string; signature?: string }> {
    try {
      console.log('🚀 Starting payment process...');
      console.log('📱 Device:', /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop');
      console.log('💰 Amount:', orderData.amount);
      
      // Check if Razorpay is already loaded (from HTML script tag)
      if (!window.Razorpay) {
        console.log('⏳ Razorpay not loaded yet, loading dynamically...');
        const scriptLoaded = await this.loadRazorpayScript();
        if (!scriptLoaded) {
          console.error('❌ Script loading failed');
          return {
            success: false,
            error: 'Failed to load payment gateway. Please check your internet connection and try again.'
          };
        }
        // Wait for initialization
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        console.log('✅ Razorpay already loaded from HTML');
      }

      if (!window.Razorpay) {
        console.error('❌ Razorpay not available');
        return {
          success: false,
          error: 'Payment gateway not available. Please refresh the page and try again.'
        };
      }

      console.log('✅ Razorpay ready, creating payment...');

      return new Promise((resolve) => {
        // Simplified options for maximum mobile compatibility
        const options: any = {
          key: this.keyId,
          amount: Math.round(orderData.amount * 100), // Convert to paise and round
          currency: orderData.currency,
          name: 'PRAYAN Masale',
          description: `Order #${orderData.orderId}`,
          image: 'https://prayan.shop/prayan-new-logo.png',
          handler: (response: any) => {
            console.log('✅ Payment successful:', response);
            resolve({ 
              success: true, 
              paymentId: response.razorpay_payment_id,
              orderId: orderData.orderId, // Use our order ID
              signature: response.razorpay_signature || ''
            });
          },
          prefill: {
            name: orderData.customerDetails.name,
            email: orderData.customerDetails.email || '',
            contact: orderData.customerDetails.phone,
          },
          notes: {
            order_id: orderData.orderId,
            address: orderData.customerDetails.address
          },
          theme: {
            color: '#ea580c',
          },
          modal: {
            ondismiss: () => {
              console.log('❌ Payment cancelled by user');
              resolve({ 
                success: false, 
                error: 'Payment cancelled. No money was charged.' 
              });
            },
            escape: true,
            backdropclose: false
          }
        };

        try {
          console.log('🔧 Creating Razorpay instance with options:', {
            key: this.keyId.substring(0, 15) + '...',
            amount: options.amount,
            currency: options.currency
          });
          
          const razorpay = new window.Razorpay(options);
          
          // Add error handler
          razorpay.on('payment.failed', function (response: any) {
            console.error('❌ Payment failed:', response.error);
            resolve({ 
              success: false, 
              error: response.error.description || 'Payment failed. Please try again.' 
            });
          });
          
          console.log('📱 Opening payment modal...');
          razorpay.open();
          
        } catch (error: any) {
          console.error('❌ Error creating Razorpay instance:', error);
          
          // Emergency fallback - offer WhatsApp order
          const useWhatsApp = confirm(
            'Payment gateway issue detected. Would you like to place order via WhatsApp instead? (No payment needed now, pay on delivery)'
          );
          
          if (useWhatsApp) {
            // Redirect to WhatsApp with order details
            const message = `Hi! I want to place an order:\n\nOrder ID: ${orderData.orderId}\nAmount: ₹${orderData.amount}\n\nCustomer: ${orderData.customerDetails.name}\nPhone: ${orderData.customerDetails.phone}\nAddress: ${orderData.customerDetails.address}`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            resolve({ 
              success: false, 
              error: 'Redirected to WhatsApp for order placement.' 
            });
          } else {
            resolve({ 
              success: false, 
              error: `Failed to open payment: ${error.message || 'Unknown error'}. Please try again or use Cash on Delivery.` 
            });
          }
        }
      });

    } catch (error: any) {
      console.error('❌ Payment initiation error:', error);
      return {
        success: false,
        error: `Payment failed: ${error.message || 'Unknown error'}. Please try Cash on Delivery.`
      };
    }
  }
}

export const razorpayService = new RazorpayService();