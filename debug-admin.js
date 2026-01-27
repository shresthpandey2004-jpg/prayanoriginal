// Quick debug script to check admin panel data
console.log('🔍 DEBUGGING ADMIN PANEL DATA');

// Check localStorage for orders
const orders = JSON.parse(localStorage.getItem('prayan-orders') || '[]');
console.log('📦 Orders in localStorage:', orders.length);
console.log('Orders data:', orders);

// Check for users
const oldUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
const newUsers = JSON.parse(localStorage.getItem('prayan-users-database') || '[]');
console.log('👤 Old users:', oldUsers.length);
console.log('👤 New users:', newUsers.length);

// Extract unique customers from orders
const uniqueCustomers = new Map();
orders.forEach(order => {
  const key = order.customerDetails.email || order.customerDetails.phone;
  if (!uniqueCustomers.has(key)) {
    uniqueCustomers.set(key, {
      name: order.customerDetails.name,
      email: order.customerDetails.email,
      phone: order.customerDetails.phone,
      city: order.customerDetails.city,
      orders: 0,
      totalSpent: 0,
      lastOrder: order.timestamp
    });
  }
  const customer = uniqueCustomers.get(key);
  customer.orders += 1;
  customer.totalSpent += order.totalPrice;
  if (new Date(order.timestamp) > new Date(customer.lastOrder)) {
    customer.lastOrder = order.timestamp;
  }
});

console.log('🛒 Unique customers from orders:', uniqueCustomers.size);
console.log('Customer data:', Array.from(uniqueCustomers.values()));

// Summary
console.log('📊 SUMMARY:');
console.log(`- Total Orders: ${orders.length}`);
console.log(`- Registered Users: ${oldUsers.length + newUsers.length}`);
console.log(`- Guest Customers: ${uniqueCustomers.size}`);
console.log(`- Total Customers: ${oldUsers.length + newUsers.length + uniqueCustomers.size}`);