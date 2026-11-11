import { read, RecordItem } from '../lib/storage';
import { Calendar, AlertTriangle, Recycle, Award, MapPin, Leaf, Bell, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { BottomNav } from './BottomNav';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useState } from 'react';

type Page = 'dashboard' | 'pickups' | 'reports' | 'kiosks' | 'profile';

interface NewDashboardProps {
  onNavigate: (page: string) => void;
}

export function NewDashboard({ onNavigate }: NewDashboardProps) {
  const [location, setLocation] = useState('lagos');
  const userName = read('profile', { name: 'Guest' }).name;
  const pickups = read<RecordItem[]>('pickups', []);
  const nextPickup = [...pickups].filter(p => p.date >= new Date().toLocaleDateString('en-CA')).sort((a,b) => a.date.localeCompare(b.date))[0];
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const quickActions = [
    {
      id: 'schedule',
      icon: Calendar,
      label: 'Schedule Pickup',
      color: 'from-[#4CAF50] to-[#66BB6A]',
      bgColor: 'bg-green-50',
    },
    {
      id: 'report',
      icon: AlertTriangle,
      label: 'Report Overflow',
      color: 'from-[#FFC107] to-[#FFD54F]',
      bgColor: 'bg-amber-50',
    },
    {
      id: 'kiosks',
      icon: Recycle,
      label: 'Recycling Kiosks',
      subLabel: '🇰🇪 Kenya · 🇳🇬 Nigeria',
      color: 'from-[#2196F3] to-[#64B5F6]',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'stats',
      icon: Award,
      label: 'My Stats / Rewards',
      color: 'from-[#9C27B0] to-[#BA68C8]',
      bgColor: 'bg-purple-50',
    },
  ];

  const handleNavigation = (page: Page) => {
    if (page === 'dashboard') return;
    onNavigate(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] via-[#E8F5E9] to-[#C8E6C9] pb-24 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Leaf className="absolute top-20 right-10 w-64 h-64 text-[#4CAF50] animate-float" />
        <Leaf className="absolute bottom-40 left-10 w-48 h-48 text-[#4CAF50] animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#C8E6C9] sticky top-0 z-40 animate-slideIn">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-[#4CAF50]">
                <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-[#558B2F]">{greeting},</p>
                <h3 className="text-[#1B5E20]">{userName}</h3>
              </div>
            </div>
            <button onClick={() => onNavigate('reports')} aria-label="View reports" className="w-10 h-10 rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-[#4CAF50]" />
            </button>
          </div>
          
          {/* Location Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#4CAF50]" />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="h-9 border-[#C8E6C9] rounded-xl bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos">🇳🇬 Lagos, Nigeria</SelectItem>
                <SelectItem value="abuja">🇳🇬 Abuja, Nigeria</SelectItem>
                <SelectItem value="nairobi">🇰🇪 Nairobi, Kenya</SelectItem>
                <SelectItem value="mombasa">🇰🇪 Mombasa, Kenya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {/* Hero Card - Next Pickup */}
        <Card className="border-[#C8E6C9] rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 opacity-20">
              <Leaf className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10">
              <Badge className="bg-white/20 text-white border-0 mb-3">Next Pickup</Badge>
              <h3 className="mb-2">{nextPickup?.date || 'No pickup saved'}</h3>
              <p className="text-white/90 mb-4">{nextPickup ? nextPickup.wasteType + ' waste' : 'Schedule your first pickup'}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">{nextPickup?.time || 'Choose a time'}</span>
                </div>
                <button
                  onClick={() => onNavigate('pickups')}
                  className="bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 flex items-center gap-2 transition-colors"
                >
                  <span className="text-sm">View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Card
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className="border-[#C8E6C9] rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer active:scale-95 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className={`${action.bgColor} p-6 pb-4`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <action.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-[#1B5E20] text-sm mb-1">{action.label}</h4>
                  {action.subLabel && (
                    <p className="text-xs text-[#558B2F] leading-relaxed">{action.subLabel}</p>
                  )}
                </div>
                <div className="px-6 py-3 bg-white flex items-center justify-end">
                  <ChevronRight className="w-4 h-4 text-[#558B2F]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1B5E20]">Your Eco Impact</h3>
              <Award className="w-6 h-6 text-[#FFC107]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F5E9] flex items-center justify-center mb-2">
                  <span className="text-2xl">🌱</span>
                </div>
                <p className="text-2xl text-[#4CAF50] mb-1">{pickups.length}</p>
                <p className="text-xs text-[#558B2F]">Pickups</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F5E9] flex items-center justify-center mb-2">
                  <span className="text-2xl">♻️</span>
                </div>
                <p className="text-2xl text-[#4CAF50] mb-1">0kg</p>
                <p className="text-xs text-[#558B2F]">Recycled</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F5E9] flex items-center justify-center mb-2">
                  <span className="text-2xl">⭐</span>
                </div>
                <p className="text-2xl text-[#4CAF50] mb-1">0</p>
                <p className="text-xs text-[#558B2F]">Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample Activity */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-[#1B5E20] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#1B5E20]">Pickup completed</p>
                  <p className="text-xs text-[#558B2F]">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-[#FFC107]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#1B5E20]">Report resolved</p>
                  <p className="text-xs text-[#558B2F]">5 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-[#1B5E20] mb-4">More Options</h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('payment')}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] rounded-2xl transition-colors shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💳</span>
                  <span className="text-white">Make Payment</span>
                </div>
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => onNavigate('payment-history')}
                className="w-full flex items-center justify-between p-4 bg-[#E8F5E9] hover:bg-[#C8E6C9] rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📜</span>
                  <span className="text-[#1B5E20]">Payment History</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#558B2F]" />
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="w-full flex items-center justify-between p-4 bg-[#E8F5E9] hover:bg-[#C8E6C9] rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-[#4CAF50]" />
                  <span className="text-[#1B5E20]">About ECO-VISION</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#558B2F]" />
              </button>
              <button
                onClick={() => onNavigate('ussd')}
                className="w-full flex items-center justify-between p-4 bg-[#E8F5E9] hover:bg-[#C8E6C9] rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📱</span>
                  <span className="text-[#1B5E20]">USSD Access (*123#)</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#558B2F]" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentPage="dashboard" onNavigate={handleNavigation} />
    </div>
  );
}
