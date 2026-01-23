import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface AdminProtectionProps {
  children: React.ReactNode;
}

const AdminProtection = ({ children }: AdminProtectionProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const session = localStorage.getItem('prayan_admin_session');
      const loginTime = localStorage.getItem('prayan_admin_login_time');
      
      if (!session || session !== 'authenticated') {
        setIsAuthenticated(false);
        return;
      }
      
      // Check if session is expired (24 hours)
      if (loginTime) {
        const loginTimestamp = parseInt(loginTime);
        const currentTime = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
        
        if (currentTime - loginTimestamp > sessionDuration) {
          // Session expired
          localStorage.removeItem('prayan_admin_session');
          localStorage.removeItem('prayan_admin_login_time');
          setIsAuthenticated(false);
          return;
        }
      }
      
      setIsAuthenticated(true);
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying admin access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not authenticated
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-gray-600">Redirecting to login...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated - render admin content
  return <>{children}</>;
};

export default AdminProtection;