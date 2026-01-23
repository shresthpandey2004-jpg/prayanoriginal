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
    freeDeliveryAbove: 199,
    standardDeliveryCharge: 50,
    expressDeliveryCharge: 100,
    deliveryAreas: [
      { pincode: "394510", area: "Kavas, Limla", charge: 0 }, // Local area - free delivery
      { pincode: "394511", area: "Kavas GIDC", charge: 30 },
      { pincode: "394512", area: "Kavas Industrial", charge: 30 },
      { pincode: "395001", area: "Surat City", charge: 50 },
      { pincode: "395002", area: "Surat Railway Station", charge: 50 },
      { pincode: "395003", area: "Surat Textile Market", charge: 60 },
      { pincode: "395004", area: "Surat Diamond Market", charge: 60 },
      { pincode: "395005", area: "Surat Hazira", charge: 70 },
      { pincode: "395006", area: "Surat Udhna", charge: 60 },
      { pincode: "395007", area: "Surat Katargam", charge: 70 },
      { pincode: "395008", area: "Surat Varachha", charge: 80 },
      { pincode: "395009", area: "Surat Adajan", charge: 70 },
      { pincode: "395010", area: "Surat Vesu", charge: 80 },
      // Add more Gujarat pincodes as needed
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