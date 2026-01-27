// Create a test order to verify admin panel functionality
console.log('🧪 CREATING TEST ORDER FOR ADMIN PANEL');

const testOrder = {
  id: 'PM' + Date.now().toString().slice(-8),
  items: [
    {
      id: 'haldi',
      name: 'Haldi (Turmeric Powder)',
      price: 160,
      quantity: 2,
      weight: '500g',
      image: '/products/turmeric-powder-new.jpg'
    },
    {
      id: 'chilli',
      name: 'Red Chilli Powder',
      price: 170,
      quantity: 1,
      weight: '500g',
      image: '/products/chilli-powder-new.jpg'
    }
  ],
  customerDetails: {
    name: 'Test Customer',
    phone: '9876543210',
    email: 'test@customer.com',
    address: '123 Test Street',
    city: 'Mumbai',
    pincode: '400001',
    paymentMethod: 'cod',
    notes: 'Test order for admin panel verification'
  },
  totalPrice: 490,
  deliveryCharge: 0,
  timestamp: new Date().toISOString(),
  status: 'confirmed',
  paymentStatus: 'pending',
  statusHistory: [{
    status: 'confirmed',
    timestamp: new Date().toISOString(),
    message: 'Test order placed successfully'
  }],
  estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  notifications: { sms: true, email: true, whatsapp: true }
};

// Get existing orders
const existingOrders = JSON.parse(localStorage.getItem('prayan-orders') || '[]');

// Add test order
const updatedOrders = [testOrder, ...existingOrders];

// Save to localStorage
localStorage.setItem('prayan-orders', JSON.stringify(updatedOrders));

console.log('✅ Test order created successfully!');
console.log('Order ID:', testOrder.id);
console.log('Customer:', testOrder.customerDetails.name);
console.log('Total orders now:', updatedOrders.length);

// Also create a test user
const testUser = {
  id: 'user-' + Date.now(),
  name: 'Test Registered User',
  email: 'registered@test.com',
  phone: '9999888877',
  password: 'test123',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  isActive: true,
  totalOrders: 1,
  totalSpent: 250
};

// Get existing users
const existingUsers = JSON.parse(localStorage.getItem('prayan-users-database') || '[]');

// Add test user
const updatedUsers = [testUser, ...existingUsers];

// Save to localStorage
localStorage.setItem('prayan-users-database', JSON.stringify(updatedUsers));

console.log('✅ Test user created successfully!');
console.log('User:', testUser.name);
console.log('Total users now:', updatedUsers.length);

console.log('🎯 Now check admin panel - you should see:');
console.log('- 1 Registered User');
console.log('- 1 Guest Customer');
console.log('- 1 Order');