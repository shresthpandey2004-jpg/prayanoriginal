import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserService from '@/services/userService';
import { Badge } from '@/components/ui/badge';

const DebugUsers = () => {
  const [firebaseUsers, setFirebaseUsers] = useState<any[]>([]);
  const [localStorageUsers, setLocalStorageUsers] = useState<any[]>([]);
  const [oldLocalStorageUsers, setOldLocalStorageUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Firebase users
      const fbUsers = await UserService.getAllUsers();
      setFirebaseUsers(fbUsers);

      // New localStorage users
      const newLocal = JSON.parse(localStorage.getItem('prayan-users-database') || '[]');
      setLocalStorageUsers(newLocal);

      // Old localStorage users
      const oldLocal = JSON.parse(localStorage.getItem('prayan-users') || '[]');
      setOldLocalStorageUsers(oldLocal);

      console.log('🔥 Firebase Users:', fbUsers);
      console.log('📦 New LocalStorage Users:', newLocal);
      console.log('📦 Old LocalStorage Users:', oldLocal);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const migrateUsers = async () => {
    try {
      const success = await UserService.migrateLocalStorageToFirebase();
      if (success) {
        alert('Migration successful!');
        loadAllData();
      } else {
        alert('Migration failed. Check console.');
      }
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration error. Check console.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">🔍 User Data Debug</h1>
          <div className="space-x-2">
            <Button onClick={loadAllData} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh All'}
            </Button>
            <Button onClick={migrateUsers} variant="default">
              🔄 Migrate to Firebase
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Firebase Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔥 Firebase Users
                <Badge variant="default">{firebaseUsers.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {firebaseUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No users in Firebase</p>
              ) : (
                <div className="space-y-2">
                  {firebaseUsers.map((user, index) => (
                    <div key={index} className="p-2 bg-green-50 rounded border">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* New LocalStorage Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 New LocalStorage
                <Badge variant="secondary">{localStorageUsers.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {localStorageUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No users in new localStorage</p>
              ) : (
                <div className="space-y-2">
                  {localStorageUsers.map((user, index) => (
                    <div key={index} className="p-2 bg-blue-50 rounded border">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Old LocalStorage Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 Old LocalStorage
                <Badge variant="outline">{oldLocalStorageUsers.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {oldLocalStorageUsers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No users in old localStorage</p>
              ) : (
                <div className="space-y-2">
                  {oldLocalStorageUsers.map((user, index) => (
                    <div key={index} className="p-2 bg-yellow-50 rounded border">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded">
                <h3 className="font-bold text-2xl text-green-600">{firebaseUsers.length}</h3>
                <p className="text-green-700">Firebase Users</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded">
                <h3 className="font-bold text-2xl text-blue-600">{localStorageUsers.length}</h3>
                <p className="text-blue-700">New LocalStorage</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded">
                <h3 className="font-bold text-2xl text-yellow-600">{oldLocalStorageUsers.length}</h3>
                <p className="text-yellow-700">Old LocalStorage</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">🔍 What's Happening:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Firebase Users:</strong> Users stored in cloud database (production)</li>
                <li>• <strong>New LocalStorage:</strong> Users from new system (prayan-users-database)</li>
                <li>• <strong>Old LocalStorage:</strong> Users from old system (prayan-users)</li>
                <li>• <strong>Migration:</strong> Moves localStorage users to Firebase</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebugUsers;