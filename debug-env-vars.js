// Debug Environment Variables
console.log('🔍 DEBUGGING ENVIRONMENT VARIABLES:');
console.log('VITE_RAZORPAY_KEY_ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);
console.log('VITE_RAZORPAY_KEY_SECRET:', import.meta.env.VITE_RAZORPAY_KEY_SECRET);
console.log('VITE_APP_ENV:', import.meta.env.VITE_APP_ENV);
console.log('All env vars:', import.meta.env);

// Check if live key is being used
const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_S9YzsBurtPax5w';
console.log('🔑 Final Key ID being used:', keyId);

if (keyId.startsWith('rzp_live_')) {
  console.log('✅ LIVE MODE DETECTED');
} else if (keyId.startsWith('rzp_test_')) {
  console.log('❌ TEST MODE DETECTED');
} else {
  console.log('⚠️ UNKNOWN KEY FORMAT');
}