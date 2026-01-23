import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkForDuplicateUser, validateEmailFormat, validatePhoneFormat, normalizePhone, normalizeEmail } from '@/utils/authUtils';

const TestAuth = () => {
  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [results, setResults] = useState<any>(null);

  const testDuplicateCheck = () => {
    const normalizedEmail = normalizeEmail(testEmail);
    const normalizedPhone = normalizePhone(testPhone);
    
    const duplicateResult = checkForDuplicateUser(normalizedEmail, normalizedPhone);
    const emailValid = validateEmailFormat(normalizedEmail);
    const phoneValid = validatePhoneFormat(normalizedPhone);
    
    setResults({
      duplicateResult,
      emailValid,
      phoneValid,
      normalizedEmail,
      normalizedPhone,
      originalEmail: testEmail,
      originalPhone: testPhone
    });
  };

  const showExistingUsers = () => {
    const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    console.log('📋 Existing users:', users);
    alert(`Found ${users.length} existing users. Check console for details.`);
  };

  const clearAllUsers = () => {
    if (confirm('Are you sure you want to clear all users? This cannot be undone.')) {
      localStorage.removeItem('prayan-users');
      localStorage.removeItem('prayan-user');
      alert('All users cleared!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Authentication System Test</CardTitle>
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
                Test Duplicate Check
              </Button>
              <Button variant="outline" onClick={showExistingUsers}>
                Show Existing Users
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
                  <strong>Duplicate Check:</strong>
                  <div className="ml-4">
                    <div className={results.duplicateResult.isDuplicate ? 'text-red-600' : 'text-green-600'}>
                      Status: {results.duplicateResult.isDuplicate ? '❌ Duplicate Found' : '✅ Available'}
                    </div>
                    {results.duplicateResult.duplicateType && (
                      <div className="text-red-600">
                        Type: {results.duplicateResult.duplicateType}
                      </div>
                    )}
                    <div className="text-gray-600">
                      Message: {results.duplicateResult.message}
                    </div>
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
              <p><strong>Test these scenarios:</strong></p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Register a new user, then try to register again with same email</li>
                <li>Register a new user, then try to register again with same phone</li>
                <li>Try different email cases (Test@Example.com vs test@example.com)</li>
                <li>Try phone with/without spaces (98765 43210 vs 9876543210)</li>
                <li>Test invalid email formats</li>
                <li>Test invalid phone formats (less than 10 digits, starting with wrong digit)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestAuth;