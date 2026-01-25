// Business Configuration
export const BUSINESS_CONFIG = {
  // Contact Details
  phone: "+918866658919", // Primary number
  phone2: "+919974849812", // Secondary number
  whatsapp: "+918866658919", // Primary WhatsApp number
  whatsapp2: "+919974849812", // Secondary WhatsApp number
  email: "contact@prayanmasale.com", // Replace with your business email
  
  // Business Address
  address: {
    street: "Balaji Complex, Ruchi Township",
    area: "Kavas, Limla",
    city: "Surat",
    state: "Gujarat",
    pincode: "394510",
    country: "India",
    plusCode: "5PJ6+VGH"
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
    freeDeliveryAbove: 0, // Free delivery on all orders
    standardDeliveryCharge: 0, // No standard delivery charge
    expressDeliveryCharge: 0, // No express delivery charge
    deliveryAreas: [
      { pincode: "394510", area: "Kavas, Limla", charge: 0 }, // Local area - free delivery
      { pincode: "394511", area: "Kavas GIDC", charge: 0 },
      { pincode: "394512", area: "Kavas Industrial", charge: 0 },
      { pincode: "395001", area: "Surat City", charge: 0 },
      { pincode: "395002", area: "Surat Railway Station", charge: 0 },
      { pincode: "395003", area: "Surat Textile Market", charge: 0 },
      { pincode: "395004", area: "Surat Diamond Market", charge: 0 },
      { pincode: "395005", area: "Surat Hazira", charge: 0 },
      { pincode: "395006", area: "Surat Udhna", charge: 0 },
      { pincode: "395007", area: "Surat Katargam", charge: 0 },
      { pincode: "395008", area: "Surat Varachha", charge: 0 },
      { pincode: "395009", area: "Surat Adajan", charge: 0 },
      { pincode: "395010", area: "Surat Vesu", charge: 0 },
      // Add more Gujarat pincodes as needed - all with 0 charge
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
    tagline: "Swad Ki Nayi Yatra",
    description: "Premium quality Indian spices sourced directly from farmers across India",
    gst: "07XXXXX1234X1ZX", // Replace with actual GST number
    fssai: "12345678901234" // Replace with actual FSSAI number
  }
};