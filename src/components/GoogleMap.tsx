import React from 'react';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const GoogleMap: React.FC = () => {
  const address = "Balaji Complex, Kawas, Surat – 394510, Gujarat, India";
  const encodedAddress = encodeURIComponent(address);
  
  const openInGoogleMaps = () => {
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const openDirections = () => {
    window.open(`https://maps.google.com/maps/dir//${encodedAddress}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Embedded Google Map */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BcqCGAOtmF8&q=${encodedAddress}&zoom=15`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="PRAYAN Spices Location"
        />
        
        {/* Overlay with store info */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span className="font-semibold text-gray-800">PRAYAN Spices</span>
          </div>
          <p className="text-xs text-gray-600">Balaji Complex, Kawas</p>
          <p className="text-xs text-gray-600">Surat, Gujarat</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button 
          onClick={openDirections}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
        <Button 
          onClick={openInGoogleMaps}
          variant="outline"
          className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
        >
          <MapPin className="w-4 h-4 mr-2" />
          View on Google Maps
        </Button>
      </div>

      {/* Store Information Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                Store Address
              </h4>
              <p className="text-sm text-gray-700">
                PRAYAN Royal Spice Emporium<br />
                Balaji Complex, Kawas<br />
                Surat – 394510, Gujarat<br />
                India
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                Store Hours
              </h4>
              <div className="text-sm text-gray-700 space-y-1">
                <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                <p>Sunday: 11:00 AM - 5:00 PM</p>
                <p className="text-orange-600 font-medium">Extended hours during festivals</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium">+91 88666 58919</span>
              </div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open('tel:+918866658919')}
              >
                Call Store
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Landmarks */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Nearby Landmarks</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Near Kawas GIDC Industrial Area</p>
            <p>• 5 minutes from Kawas Railway Station</p>
            <p>• Close to Surat-Mumbai Highway</p>
            <p>• Opposite to Balaji Temple</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleMap;