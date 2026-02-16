// Firebase Connection Test
// Run this in browser console to test Firebase connection

console.log('🔥 Testing Firebase Connection...');

// Test Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCVz6HO-I3Rd-Sh5r5_tgIr1qqSX9DNCw8",
  authDomain: "prayanmasale.firebaseapp.com",
  projectId: "prayanmasale",
  storageBucket: "prayanmasale.firebasestorage.app",
  messagingSenderId: "1004240730582",
  appId: "1:1004240730582:web:1823850a1c2bed9425cc77",
  measurementId: "G-Y8WFB72MS0"
};

console.log('📋 Firebase Config:', firebaseConfig);
console.log('🎯 Project ID:', firebaseConfig.projectId);
console.log('🌐 Auth Domain:', firebaseConfig.authDomain);

// Instructions for testing
console.log(`

1. Open website: http://localhost:8080/
2. Go to /test-auth page
3. Click "Test Firebase Check" button
4. Register a new user
5. Check admin panel (/admin)
6. Verify user appears in Firebase console

✅ Expected Results:
- Users saved to Firestore collection 'users'
- Real-time sync across devices
- Backup in localStorage for offline access
- Admin panel shows Firebase data

🔍 Debug Steps:
- Check browser console for Firebase logs
- Verify network requests to Firebase
- Check Firestore rules in Firebase console
- Ensure internet connection is stable
`);

// Test data structure
const sampleUser = {
  id: 'test-user-' + Date.now(),
  name: 'Test User',
  email: 'test@firebase.com',
  phone: '9876543210',
  password: 'test123',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: true,
  totalOrders: 0,
  totalSpent: 0
};

console.log('📝 Sample User Data Structure:', sampleUser);