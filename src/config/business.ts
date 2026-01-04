// Business Configuration
export const BUSINESS_CONFIG = {
  // Contact Details
  phone: "+919876543210", // Replace with your actual number
  whatsapp: "+919876543210", // Replace with your actual WhatsApp number
  email: "info@prayanmasale.com", // Replace with your business email
  
  // Business Address
  address: {
    street: "123 Spice Market Street",
    area: "Gandhi Nagar",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India"
  },
  
  // Business Hours
  hours: {
    monday: "9:00 AM - 8:00 PM",
    tuesday: "9:00 AM - 8:00 PM", 
    wednesday: "9:00 AM - 8:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "9:00 AM - 8:00 PM",
    sunday: "10:00 AM - 6:00 PM"
  },
  
  // Delivery Settings
  delivery: {
    freeDeliveryAbove: 499,
    standardDeliveryCharge: 50,
    expressDeliveryCharge: 100,
    deliveryAreas: [
      { pincode: "400001", area: "Mumbai Central", charge: 30 },
      { pincode: "400002", area: "Mumbai Fort", charge: 30 },
      { pincode: "400003", area: "Mumbai CST", charge: 40 },
      { pincode: "400004", area: "Mumbai Girgaon", charge: 40 },
      { pincode: "400005", area: "Mumbai Colaba", charge: 50 },
      // Add more pincodes as needed
    ]
  },
  
  // Social Media
  social: {
    facebook: "https://facebook.com/prayanmasale",
    instagram: "https://instagram.com/prayanmasale", 
    twitter: "https://twitter.com/prayanmasale",
    youtube: "https://youtube.com/@prayanmasale"
  },
  
  // Business Info
  info: {
    name: "Prayan Royal Spice Emporium",
    tagline: "Pure Taste, Pure Emotions",
    description: "Premium quality Indian spices sourced directly from farmers",
    gst: "27XXXXX1234X1ZX", // Replace with actual GST number
    fssai: "12345678901234" // Replace with actual FSSAI number
  }
};