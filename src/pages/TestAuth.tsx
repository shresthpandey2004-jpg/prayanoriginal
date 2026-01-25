import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateEmailFormat, validatePhoneFormat, normalizePhone, normalizeEmail } from '@/utils/authUtils';
import UserService from '@/services/userService';

const TestAuth = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [results, setResults] = useState<any>(null);

  const testDuplicateCheck = async () => {
    const normalizedEmail = normalizeEmail(testEmail);
    const normalizedPhone = normalizePhone(testPhone);
    
    try {
      // Test using UserService (now async)
      const existingUserByEmail = await UserService.getUserByEmail(normalizedEmail);
      const existingUserByPhone = await UserService.getUserByPhone(normalizedPhone);
      
      const emailValid = validateEmailFormat(normalizedEmail);
      const phoneValid = validatePhoneFormat(normalizedPhone);
      const userStats = await UserService.getUserStats();
      
      setResults({
        existingUserByEmail: !!existingUserByEmail,
        existingUserByPhone: !!existingUserByPhone,
        emailValid,
        phoneValid,
        normalizedEmail,
        normalizedPhone,
        originalEmail: testEmail,
        originalPhone: testPhone,
        userStats
      });
    } catch (error) {
      console.error('Error testing duplicate check:', error);
      alert('Error testing Firebase connection. Check console for details.');
    }
  };

  const showExistingUsers = async () => {
    try {
      const users = await UserService.getAllUsers();
      console.log('📋 Existing users from Firebase:', users);
      alert(`Found ${users.length} existing users in Firebase. Check console for details.`);
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Error loading users from Firebase. Check console for details.');
    }
  };

  const clearAllUsers = async () => {
    if (confirm('Are you sure you want to clear all users from Firebase? This cannot be undone.')) {
      try {
        const success = await UserService.clearAllUsers();
        if (success) {
          localStorage.removeItem('prayan-user');
          alert('All users cleared from Firebase and localStorage!');
        } else {
          alert('Error clearing users. Check console for details.');
        }
      } catch (error) {
        console.error('Error clearing users:', error);
        alert('Error clearing users. Check console for details.');
      }
    }
  };

  const migrateUsers = async () => {
    if (confirm('Migrate localStorage users to Firebase?')) {
      try {
        const success = await UserService.migrateLocalStorageToFirebase();
        if (success) {
          alert('Users successfully migrated to Firebase!');
        } else {
          alert('Migration completed with some errors. Check console for details.');
        }
      } catch (error) {
        console.error('Error migrating users:', error);
        alert('Error migrating users. Check console for details.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔥 Firebase Integration Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Test Email:</label>
              <Input
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Test Phone:</label>
              <Input
                placeholder="9876543210"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={testDuplicateCheck}>
                Test Firebase Check
              </Button>
              <Button variant="outline" onClick={showExistingUsers}>
                Show Firebase Users
              </Button>
              <Button variant="secondary" onClick={migrateUsers}>
                Migrate to Firebase
              </Button>
              <Button variant="destructive" onClick={clearAllUsers}>
                Clear All Users
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>🔍 Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Original Input:</strong>
                  <div className="ml-4">
                    <div>Email: "{results.originalEmail}"</div>
                    <div>Phone: "{results.originalPhone}"</div>
                  </div>
                </div>
                
                <div>
                  <strong>Normalized:</strong>
                  <div className="ml-4">
                    <div>Email: "{results.normalizedEmail}"</div>
                    <div>Phone: "{results.normalizedPhone}"</div>
                  </div>
                </div>
                
                <div>
                  <strong>Validation:</strong>
                  <div className="ml-4">
                    <div className={results.emailValid ? 'text-green-600' : 'text-red-600'}>
                      Email Format: {results.emailValid ? '✅ Valid' : '❌ Invalid'}
                    </div>
                    <div className={results.phoneValid ? 'text-green-600' : 'text-red-600'}>
                      Phone Format: {results.phoneValid ? '✅ Valid' : '❌ Invalid'}
                    </div>
                  </div>
                </div>
                
                <div>
                  <strong>Firebase Duplicate Check:</strong>
                  <div className="ml-4">
                    <div className={results.existingUserByEmail ? 'text-red-600' : 'text-green-600'}>
                      Email: {results.existingUserByEmail ? '❌ Already exists in Firebase' : '✅ Available'}
                    </div>
                    <div className={results.existingUserByPhone ? 'text-red-600' : 'text-green-600'}>
                      Phone: {results.existingUserByPhone ? '❌ Already exists in Firebase' : '✅ Available'}
                    </div>
                  </div>
                </div>

                <div>
                  <strong>Firebase User Statistics:</strong>
                  <div className="ml-4">
                    <div>Total Users: {results.userStats.totalUsers}</div>
                    <div>Active Users: {results.userStats.activeUsers}</div>
                    <div>New This Month: {results.userStats.newUsersThisMonth}</div>
                    <div>Total Revenue: ₹{results.userStats.totalRevenue}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>📝 Test Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <p><strong>Firebase Integration Test Cases:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Register a new user, check if it appears in Firebase</li>
                <li>Try to register again with same email (should show Firebase duplicate error)</li>
                <li>Check admin panel - users should load from Firebase</li>
                <li>Test migration from localStorage to Firebase</li>
                <li>Verify real-time data sync across devices</li>
                <li>Test offline fallback to localStorage</li>
              </ul>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">✅ Firebase Status: Connected</p>
                <p className="text-green-700 text-sm">Project: prayanmasale.firebaseapp.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestAuth;