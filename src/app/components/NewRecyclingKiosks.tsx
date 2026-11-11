import { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, Navigation, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { BottomNav } from './BottomNav';

interface NewRecyclingKiosksProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
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
    name: 'Victoria Island Hub',
    address: '12 Akin Adesola Street',
    city: 'Lagos',
    phone: '+234 805 123 4567',
    hours: 'Mon-Fri: 9AM-5PM',
    distance: '4.1 km',
    types: ['Electronics', 'Plastic'],
    country: 'nigeria',
  },
  {
    id: 3,
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
    id: 4,
    name: 'Westlands Eco Station',
    address: 'Waiyaki Way, Westlands',
    city: 'Nairobi',
    phone: '+254 720 987 654',
    hours: 'Mon-Fri: 8AM-5PM',
    distance: '1.8 km',
    types: ['Glass', 'Plastic', 'Paper'],
    country: 'kenya',
  },
];

export function NewRecyclingKiosks({ onBack, onNavigate }: NewRecyclingKiosksProps) {
  const [selectedCountry, setSelectedCountry] = useState<'nigeria' | 'kenya'>('nigeria');

  const filteredKiosks = kiosks.filter(k => k.country === selectedCountry);
  const countryData = {
    nigeria: { emoji: '🇳🇬', name: 'Nigeria', color: 'from-green-600 to-green-400' },
    kenya: { emoji: '🇰🇪', name: 'Kenya', color: 'from-red-600 to-green-600' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2196F3] to-[#64B5F6] text-white sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2>Recycling Kiosks</h2>
            <p className="text-sm text-white/90">Sample locations — verify details before travelling</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {/* Country Toggle */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-2">
              <button
                onClick={() => setSelectedCountry('kenya')}
                className={`py-4 px-6 transition-all ${
                  selectedCountry === 'kenya'
                    ? 'bg-gradient-to-br from-[#2196F3] to-[#64B5F6] text-white'
                    : 'bg-white text-[#558B2F] hover:bg-[#E8F5E9]'
                }`}
              >
                <div className="text-2xl mb-1">🇰🇪</div>
                <p className="text-sm">Kenya</p>
              </button>
              <button
                onClick={() => setSelectedCountry('nigeria')}
                className={`py-4 px-6 transition-all ${
                  selectedCountry === 'nigeria'
                    ? 'bg-gradient-to-br from-[#2196F3] to-[#64B5F6] text-white'
                    : 'bg-white text-[#558B2F] hover:bg-[#E8F5E9]'
                }`}
              >
                <div className="text-2xl mb-1">🇳🇬</div>
                <p className="text-sm">Nigeria</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="h-64 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-3 h-3 bg-[#4CAF50] rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-3 h-3 bg-[#4CAF50] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-[#4CAF50] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-[#4CAF50] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
              <div className="text-center z-10">
                <MapPin className="w-16 h-16 text-[#2196F3] mx-auto mb-3" />
                <p className="text-[#1B5E20]">{countryData[selectedCountry].emoji} {countryData[selectedCountry].name}</p>
                <p className="text-sm text-[#558B2F]">{filteredKiosks.length} kiosks nearby</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kiosks List */}
        <div className="space-y-4">
          {filteredKiosks.map((kiosk) => (
            <Card key={kiosk.id} className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#1B5E20]">{kiosk.name}</h4>
                      <span className="text-xl">{kiosk.country === 'nigeria' ? '🇳🇬' : '🇰🇪'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-[#558B2F]">
                      <Navigation className="w-3 h-3" />
                      <span>{kiosk.distance} away</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#4CAF50] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#1B5E20]">{kiosk.address}</p>
                      <p className="text-[#558B2F]">{kiosk.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#4CAF50]" />
                    <p className="text-[#558B2F]">{kiosk.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#4CAF50]" />
                    <p className="text-[#558B2F]">{kiosk.hours}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-[#558B2F] mb-2">Accepts:</p>
                  <div className="flex flex-wrap gap-2">
                    {kiosk.types.map((type) => (
                      <Badge key={type} className="bg-[#E8F5E9] text-[#1B5E20] border-0 rounded-xl">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => window.location.href = 'tel:' + kiosk.phone.replace(/\s/g, '')}
                    variant="outline"
                    className="rounded-2xl border-[#C8E6C9] text-[#4CAF50] hover:bg-[#E8F5E9]"
                  >
                    📞 Call
                  </Button>
                  <Button onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(kiosk.address + ', ' + kiosk.city), '_blank', 'noopener,noreferrer')} className="rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white">
                    🗺️ Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SMS Feature */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-[#E8F5E9]">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
              <span className="text-3xl">💬</span>
            </div>
            <h4 className="text-[#1B5E20] mb-2">Need details via SMS?</h4>
            <p className="text-sm text-[#558B2F] mb-4">Send kiosk info to your phone for offline access</p>
            <Button
              onClick={() => window.location.href = 'sms:?body=' + encodeURIComponent(filteredKiosks.map(k => k.name + ': ' + k.address + ', ' + k.city).join('\n'))}
              variant="outline"
              className="rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-white"
            >
              Send via SMS
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav currentPage="kiosks" onNavigate={onNavigate} />
    </div>
  );
}
