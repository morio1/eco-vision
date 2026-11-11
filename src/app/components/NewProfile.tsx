import { read, write } from '../lib/storage';
import { useEffect, useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Award, Settings, LogOut, Moon, Bell, Globe, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { BottomNav } from './BottomNav';

interface NewProfileProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function NewProfile({ onBack, onNavigate }: NewProfileProps) {
  const [darkMode, setDarkMode] = useState(() => read('darkMode', false));
  const [notifications, setNotifications] = useState(() => read('notifications', true));
  const [language, setLanguage] = useState(() => read('language', 'english'));
  useEffect(() => { document.documentElement.classList.toggle('eco-dark', darkMode); try { write('darkMode', darkMode); write('notifications', notifications); write('language', language); } catch {} }, [darkMode, notifications, language]);
  const [showSettings, setShowSettings] = useState(false);

  const user = {
    name: read('profile', { name: 'Guest' }).name,
    email: read('profile', { email: 'Not provided' }).email,
    phone: 'Not provided',
    location: read('profile', { country: 'Not selected' }).country,
    country: '🇳🇬',
    points: 0,
    level: 'Local demo',
  };

  const stats = [
    { label: 'Pickups', value: String(read<any[]>('pickups', []).length), icon: '🚚', color: 'from-green-400 to-green-600' },
    { label: 'Recycled', value: '0kg', icon: '♻️', color: 'from-blue-400 to-blue-600' },
    { label: 'Points', value: '0', icon: '⭐', color: 'from-amber-400 to-amber-600' },
    { label: 'Reports', value: String(read<any[]>('reports', []).length), icon: '⚠️', color: 'from-orange-400 to-orange-600' },
  ];

  const achievements = [
    { name: 'Eco Warrior', desc: '10+ pickups', emoji: '🌟' },
    { name: 'Recycling Champion', desc: '50kg recycled', emoji: '♻️' },
    { name: 'Community Hero', desc: '5+ reports', emoji: '🦸' },
  ];

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] pb-24">
        <div className="bg-white/80 backdrop-blur-md border-b border-[#C8E6C9] sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center gap-3">
            <button
              onClick={() => setShowSettings(false)}
              className="w-10 h-10 rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
            </button>
            <h2 className="text-[#1B5E20]">Settings</h2>
          </div>
        </div>

        <div className="px-4 py-6 space-y-4 animate-fadeIn">
          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <Label className="text-[#1B5E20]">Dark Mode</Label>
                    <p className="text-sm text-[#558B2F]">Switch to dark theme</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <Separator className="bg-[#C8E6C9]" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <Label className="text-[#1B5E20]">Notifications</Label>
                    <p className="text-sm text-[#558B2F]">Save alert preference (delivery not connected)</p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <Label className="text-[#1B5E20]">Preferred language (interface is English)</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-2 h-10 rounded-xl border-[#C8E6C9]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="swahili">Kiswahili</SelectItem>
                      <SelectItem value="hausa">Hausa</SelectItem>
                      <SelectItem value="yoruba">Yorùbá</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => onNavigate('logout')} variant="destructive"
            className="w-full h-12 rounded-2xl"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>

        <BottomNav currentPage="profile" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2>Profile</h2>
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="px-4 pb-8 pt-4 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-xl">
            <AvatarFallback className="bg-white text-[#4CAF50] text-3xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h3 className="mb-2">{user.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">{user.country}</span>
            <Badge className="bg-amber-500 border-0">
              {user.level}
            </Badge>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-white/90">
            <Award className="w-4 h-4" />
            <span>{user.points} Eco Points</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-6 animate-fadeIn">
        {/* Stats Grid */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-2 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-md`}>
                    {stat.icon}
                  </div>
                  <p className="text-2xl text-[#4CAF50] mb-1">{stat.value}</p>
                  <p className="text-xs text-[#558B2F]">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6 space-y-4">
            <h4 className="text-[#1B5E20] mb-3">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-sm text-[#558B2F]">Email</p>
                  <p className="text-[#1B5E20]">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-sm text-[#558B2F]">Phone</p>
                  <p className="text-[#1B5E20]">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-sm text-[#558B2F]">Location</p>
                  <p className="text-[#1B5E20]">{user.location}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-[#1B5E20] mb-4">Sample Achievements 🏆</h4>
            <div className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-[#E8F5E9] rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">
                    {achievement.emoji}
                  </div>
                  <div>
                    <p className="text-[#1B5E20]">{achievement.name}</p>
                    <p className="text-sm text-[#558B2F]">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav currentPage="profile" onNavigate={onNavigate} />
    </div>
  );
}
