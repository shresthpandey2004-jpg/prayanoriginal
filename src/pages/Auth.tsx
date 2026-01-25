import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import { validateEmailFormat, validatePhoneFormat, normalizePhone } from '@/utils/authUtils';

  const from = location.state?.from?.pathname || '/';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isLoading } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [realTimeValidation, setRealTimeValidation] = useState<any>({});

  // Real-time validation for email and phone
  const checkEmailAvailability = (email: string) => {
    if (!email || !validateEmailFormat(email)) return;
    
    const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    const existingUser = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase()
    );
    
    setRealTimeValidation(prev => ({
      ...prev,
      email: existingUser ? 'This email is already registered' : 'Email is available'
    }));
  };

  const checkPhoneAvailability = (phone: string) => {
    const normalizedPhone = normalizePhone(phone);
    if (!normalizedPhone || !validatePhoneFormat(normalizedPhone)) return;
    
    const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    const existingUser = users.find((u: any) => u.phone === normalizedPhone);
    
    setRealTimeValidation(prev => ({
      ...prev,
      phone: existingUser ? 'This phone number is already registered' : 'Phone number is available'
    }));
  };

  const validateLogin = () => {
    const newErrors: any = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors: any = {};
    
    // Name validation
    if (!registerData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (registerData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmailFormat(registerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!registerData.phone) {
      newErrors.phone = 'Phone number is required';
    } else {
      const normalizedPhone = normalizePhone(registerData.phone);
      if (!validatePhoneFormat(normalizedPhone)) {
        newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (starting with 6-9)';
      }
    }
    
    // Password validation
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)/.test(registerData.password)) {
      newErrors.password = 'Password should contain at least one uppercase letter or number';
    }
    
    // Confirm password validation
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    const success = await login(loginData.email, loginData.password);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully.",
      });
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    const result = await register({
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password
    });

    if (result.success) {
      toast({
        title: "Account created! 🎉",
        description: "Welcome to Prayan Masale! You are now logged in.",
      });
      
      navigate(from, { replace: true });
    } else {
      // Show specific error message
      toast({
        title: "Registration failed",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">प्</span>
            </div>
            <CardTitle className="text-2xl">Welcome to Prayan Masale</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>

                <div className="text-center text-sm text-gray-600">
                  <p>Demo Account: demo@prayan.com / password123</p>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-name"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                        className={`pl-10 ${errors.name ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={registerData.email}
                        onChange={(e) => {
                          setRegisterData(prev => ({ ...prev, email: e.target.value }));
                          // Clear previous validation
                          setRealTimeValidation(prev => ({ ...prev, email: null }));
                        }}
                        onBlur={(e) => checkEmailAvailability(e.target.value)}
                        className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    {realTimeValidation.email && (
                      <p className={`text-sm mt-1 ${
                        realTimeValidation.email.includes('available') 
                          ? 'text-green-600' 
                          : 'text-red-500'
                      }`}>
                        {realTimeValidation.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-phone"
                        placeholder="10-digit mobile number (e.g., 9876543210)"
                        value={registerData.phone}
                        onChange={(e) => {
                          // Allow only numbers and limit to 10 digits
                          const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setRegisterData(prev => ({ ...prev, phone: value }));
                          // Clear previous validation
                          setRealTimeValidation(prev => ({ ...prev, phone: null }));
                        }}
                        onBlur={(e) => checkPhoneAvailability(e.target.value)}
                        className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    {realTimeValidation.phone && (
                      <p className={`text-sm mt-1 ${
                        realTimeValidation.phone.includes('available') 
                          ? 'text-green-600' 
                          : 'text-red-500'
                      }`}>
                        {realTimeValidation.phone}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number starting with 6, 7, 8, or 9</p>
                  </div>

                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password (min 6 characters)"
                        value={registerData.password}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className={`pl-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;