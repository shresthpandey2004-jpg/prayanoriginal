// Business Configuration
export const BUSINESS_CONFIG = {
  // Contact Details
  phone: "+918866658919", // Your actual number
  whatsapp: "+918866658919", // Your actual WhatsApp number
  email: "contact@prayanmasale.com", // Replace with your business email
  
  // Business Address
  address: {
    street: "Shop No. 15, Spice Market Complex",
    area: "Khari Baoli",
    city: "Delhi",
    state: "Delhi",
    pincode: "110006",
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
      { pincode: "110001", area: "Delhi Cantt", charge: 30 },
      { pincode: "110002", area: "Delhi GPO", charge: 30 },
      { pincode: "110003", area: "New Delhi", charge: 40 },
      { pincode: "110004", area: "Rashtrapati Bhawan", charge: 40 },
      { pincode: "110005", area: "Karol Bagh", charge: 50 },
      { pincode: "110006", area: "Khari Baoli", charge: 30 },
      { pincode: "110007", area: "Daryaganj", charge: 40 },
      { pincode: "110008", area: "New Delhi GPO", charge: 40 },
      { pincode: "110009", area: "Connaught Place", charge: 50 },
      { pincode: "110010", area: "Gole Market", charge: 50 },
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
    description: "Premium quality Indian spices sourced directly from farmers across India",
    gst: "07XXXXX1234X1ZX", // Replace with actual GST number
    fssai: "12345678901234" // Replace with actual FSSAI number
  }
};