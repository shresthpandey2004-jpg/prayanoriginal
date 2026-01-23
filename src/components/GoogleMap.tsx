import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const GoogleMap: React.FC = () => {
  const [mapError, setMapError] = useState(false);
  const address = "Balaji Complex, Kawas, Surat – 394510, Gujarat, India";
  const encodedAddress = encodeURIComponent(address);
  
  // Coordinates for Kawas, Surat (approximate)
  const latitude = 21.3099;
  const longitude = 72.7757;
  
  const openInGoogleMaps = () => {
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const openDirections = () => {
    window.open(`https://maps.google.com/maps/dir//${encodedAddress}`, '_blank');
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className="space-y-4">
      {/* Embedded Google Map */}
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg bg-gray-100">
        {!mapError ? (
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE4JzM2LjAiTiA3MsKwNDYnMzIuNSJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="PRAYAN Spices Location"
            onError={handleMapError}
          />
        ) : (
          // Fallback when map fails to load
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
            <div className="text-center p-6">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">PRAYAN Spices Location</h3>
              <p className="text-gray-600 mb-4">
                Balaji Complex, Kawas<br />
                Surat – 394510, Gujarat, India
              </p>
              <Button onClick={openInGoogleMaps} className="bg-orange-600 hover:bg-orange-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>
          </div>
        )}
        
        {/* Overlay with store info */}
        {!mapError && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span className="font-semibold text-gray-800">PRAYAN Spices</span>
            </div>
            <p className="text-xs text-gray-600">Balaji Complex, Kawas</p>
            <p className="text-xs text-gray-600">Surat, Gujarat</p>
          </div>
        )}
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
                <span className="text-sm font-medium">+91 88666 58919 | +91 99748 49812</span>
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

      {/* Alternative Map Options */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Find Us On</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')}
            >
              Google Maps
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://www.bing.com/maps?q=${encodedAddress}`, '_blank')}
            >
              Bing Maps
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://maps.apple.com/?q=${encodedAddress}`, '_blank')}
            >
              Apple Maps
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://waze.com/ul?q=${encodedAddress}`, '_blank')}
            >
              Waze
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleMap;