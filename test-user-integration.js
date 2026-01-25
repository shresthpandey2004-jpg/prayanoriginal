// Simple test to verify UserService integration
// Run this in browser console to test user registration

// Test user data
const testUser = {
  id: 'test-user-' + Date.now(),
  name: 'Test User',
  email: 'test@example.com',
  phone: '9876543210',
  password: 'test123',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: true,
  totalOrders: 0,
  totalSpent: 0
};

// Import UserService (this would be done differently in actual code)
// For testing, we'll simulate the UserService functionality

const USERS_STORAGE_KEY = 'prayan-users-database';

// Save test user
function saveTestUser() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    users.push(testUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    console.log('✅ Test user saved:', testUser.name);
    return true;
  } catch (error) {
    console.error('❌ Error saving test user:', error);
    return false;
  }
}

// Get all users
function getAllUsers() {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

// Run test
console.log('🧪 Testing UserService integration...');
console.log('📊 Users before test:', getAllUsers().length);

if (saveTestUser()) {
  console.log('📊 Users after test:', getAllUsers().length);
  console.log('✅ Test completed! Check admin panel to see if user appears.');
} else {
  console.log('❌ Test failed!');
}