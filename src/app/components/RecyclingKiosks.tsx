import { ArrowLeft, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';

interface RecyclingKiosksProps {
  onBack: () => void;
}

interface Kiosk {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  distance: string;
  types: string[];
  country: 'nigeria' | 'kenya';
}

const kiosks: Kiosk[] = [
  {
    id: 1,
    name: 'Lagos Eco Center',
    address: '45 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    phone: '+234 803 456 7890',
    hours: 'Mon-Sat: 8AM-6PM',
    distance: '2.3 km',
    types: ['Plastic', 'Paper', 'Metal', 'Glass'],
    country: 'nigeria',
  },
  {
    id: 2,
    name: 'Victoria Island Recycling Hub',
    address: '12 Akin Adesola Street',
    city: 'Lagos',
    phone: '+234 805 123 4567',
    hours: 'Mon-Fri: 9AM-5PM',
    distance: '4.1 km',
    types: ['Electronics', 'Plastic', 'Paper'],
    country: 'nigeria',
  },
  {
    id: 3,
    name: 'Abuja Green Point',
    address: '78 Gimbiya Street, Garki',
    city: 'Abuja',
    phone: '+234 807 890 1234',
    hours: 'Mon-Sat: 8AM-7PM',
    distance: '5.7 km',
    types: ['All Materials', 'Organic'],
    country: 'nigeria',
  },
  {
    id: 4,
    name: 'Nairobi Waste Solutions',
    address: 'Mombasa Road, Industrial Area',
    city: 'Nairobi',
    phone: '+254 712 345 678',
    hours: 'Mon-Sat: 7AM-6PM',
    distance: '3.2 km',
    types: ['Plastic', 'Metal', 'Paper', 'E-waste'],
    country: 'kenya',
  },
  {
    id: 5,
    name: 'Westlands Eco Station',
    address: 'Waiyaki Way, Westlands',
    city: 'Nairobi',
    phone: '+254 720 987 654',
    hours: 'Mon-Fri: 8AM-5PM',
    distance: '1.8 km',
    types: ['Glass', 'Plastic', 'Paper'],
    country: 'kenya',
  },
  {
    id: 6,
    name: 'Mombasa Recycling Center',
    address: 'Nyerere Avenue, Mombasa',
    city: 'Mombasa',
    phone: '+254 741 234 567',
    hours: 'Mon-Sat: 8AM-6PM',
    distance: '6.5 km',
    types: ['All Materials'],
    country: 'kenya',
  },
];

export function RecyclingKiosks({ onBack }: RecyclingKiosksProps) {
  const [selectedCountry, setSelectedCountry] = useState<'nigeria' | 'kenya'>('nigeria');

  const filteredKiosks = kiosks.filter(kiosk => kiosk.country === selectedCountry);

  const countryEmoji = selectedCountry === 'nigeria' ? '🇳🇬' : '🇰🇪';
  const countryName = selectedCountry === 'nigeria' ? 'Nigeria' : 'Kenya';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-green-800 mb-2">Recycling Kiosks Near You</h1>
          <p className="text-green-600">Find the nearest recycling drop-off points</p>
        </div>

        {/* Country Selector */}
        <div className="mb-6">
          <Card className="border-green-100">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <span className="text-green-800">Select Country:</span>
                <Tabs value={selectedCountry} onValueChange={(value) => setSelectedCountry(value as 'nigeria' | 'kenya')}>
                  <TabsList>
                    <TabsTrigger value="nigeria" className="flex items-center gap-2">
                      <span>🇳🇬</span>
                      Nigeria
                    </TabsTrigger>
                    <TabsTrigger value="kenya" className="flex items-center gap-2">
                      <span>🇰🇪</span>
                      Kenya
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <Card className="border-green-100 mb-6">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-green-600 mx-auto mb-3" />
                <p className="text-green-800">{countryEmoji} Map View - {countryName}</p>
                <p className="text-sm text-green-600 mt-1">Showing recycling kiosks in your area</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kiosks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKiosks.map((kiosk) => (
            <Card key={kiosk.id} className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-green-800">{kiosk.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Navigation className="w-3 h-3" />
                      {kiosk.distance}
                    </CardDescription>
                  </div>
                  <span className="text-2xl">{kiosk.country === 'nigeria' ? '🇳🇬' : '🇰🇪'}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-800">{kiosk.address}</p>
                      <p className="text-sm text-green-600">{kiosk.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">{kiosk.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">{kiosk.hours}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-green-800 mb-2">Accepts:</p>
                  <div className="flex flex-wrap gap-2">
                    {kiosk.types.map((type) => (
                      <Badge key={type} variant="secondary" className="bg-green-100 text-green-700">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
