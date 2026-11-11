import { Calendar, AlertTriangle, MapPin, HelpCircle, Mail, Info, User, Settings, Leaf, Menu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { icon: Calendar, label: 'Schedule Pickup', page: 'schedule', color: 'bg-green-100 text-green-600' },
    { icon: AlertTriangle, label: 'Report Waste Overflow', page: 'report', color: 'bg-orange-100 text-orange-600' },
    { icon: MapPin, label: 'Recycling Kiosks Near Me', page: 'kiosks', color: 'bg-blue-100 text-blue-600' },
    { icon: HelpCircle, label: 'FAQs', page: 'faqs', color: 'bg-purple-100 text-purple-600' },
    { icon: Mail, label: 'Contact Us', page: 'contact', color: 'bg-pink-100 text-pink-600' },
    { icon: Info, label: 'About Us', page: 'about', color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-green-800">ECO-VISION</h1>
                <p className="text-green-600 text-sm">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-700 hover:text-green-800 hover:bg-green-100"
                onClick={() => onNavigate('profile')}
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-green-700 hover:text-green-800 hover:bg-green-100"
                onClick={() => onNavigate('settings')}
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-green-700">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="mt-8 space-y-4">
                    {navigationItems.map((item) => (
                      <Button
                        key={item.page}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          onNavigate(item.page);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-green-800 mb-2">Welcome to ECO-VISION</h2>
          <p className="text-green-600">Manage your waste efficiently and contribute to a cleaner Africa</p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item) => (
            <Card
              key={item.page}
              className="cursor-pointer hover:shadow-lg transition-shadow border-green-100"
              onClick={() => onNavigate(item.page)}
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-green-800">{item.label}</CardTitle>
                <CardDescription>
                  {item.page === 'schedule' && 'Book a waste collection from your location'}
                  {item.page === 'report' && 'Alert authorities about overflowing waste'}
                  {item.page === 'kiosks' && 'Find nearby recycling drop-off points'}
                  {item.page === 'faqs' && 'Get answers to common questions'}
                  {item.page === 'contact' && 'Reach out to our support team'}
                  {item.page === 'about' && 'Learn more about our mission'}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Scheduled Pickups</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">2 upcoming</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Waste Reported</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">5 this month</p>
            </CardContent>
          </Card>
          
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle className="text-green-800">Recycling Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">45 kg recycled</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
