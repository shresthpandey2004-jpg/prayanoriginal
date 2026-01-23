// Authentication utility functions
export interface DuplicateCheckResult {
  isDuplicate: boolean;
  duplicateType: 'email' | 'phone' | null;
  message: string;
}

export const checkForDuplicateUser = (email: string, phone: string): DuplicateCheckResult => {
  const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
  
  // Normalize inputs for comparison
  const normalizedEmail = normalizeEmail(email);
  const normalizedPhone = normalizePhone(phone);
  
  // Check for existing email (case-insensitive)
  const existingUserByEmail = users.find((u: any) => 
    normalizeEmail(u.email) === normalizedEmail
  );
  
  if (existingUserByEmail) {
    return {
      isDuplicate: true,
      duplicateType: 'email',
      message: 'This email address is already registered. Please use a different email or try logging in.'
    };
  }
  
  // Check for existing phone number (normalized)
  const existingUserByPhone = users.find((u: any) => 
    normalizePhone(u.phone) === normalizedPhone
  );
  
  if (existingUserByPhone) {
    return {
      isDuplicate: true,
      duplicateType: 'phone',
      message: 'This phone number is already registered. Please use a different phone number or try logging in.'
    };
  }
  
  return {
    isDuplicate: false,
    duplicateType: null,
    message: 'Email and phone number are available.'
  };
};

export const validateEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneFormat = (phone: string): boolean => {
  // Indian phone number validation (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const normalizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

export const normalizePhone = (phone: string): string => {
  // Remove any spaces, dashes, or other characters
  return phone.replace(/\D/g, '');
};

export const generateUserId = (): string => {
  // Generate a more unique ID using timestamp + random string
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `user_${timestamp}_${randomStr}`;
};

export const sanitizeUserData = (userData: any) => {
  return {
    ...userData,
    email: normalizeEmail(userData.email),
    phone: normalizePhone(userData.phone),
    name: userData.name.trim()
  };
};