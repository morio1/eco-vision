import { ArrowLeft, Leaf, Target, Users, Globe, Heart, Recycle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-green-700 hover:text-green-800 hover:bg-green-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-green-800 mb-2">About ECO-VISION</h1>
          <p className="text-green-600">Transforming waste management across Africa</p>
        </div>

        {/* Hero Section */}
        <Card className="border-green-100 mb-8">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1637681262973-a516e647e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzYyNTM5MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Waste Management"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Leaf className="w-20 h-20 mx-auto mb-4" />
                  <h2>Building a Cleaner Africa</h2>
                  <p className="mt-2">One community at a time</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-green-700 leading-relaxed">
                ECO-VISION is a pioneering waste management platform dedicated to transforming how African communities handle waste. 
                We leverage technology to connect citizens with efficient waste collection services, promote recycling, and foster 
                environmental awareness. Our mission is to create cleaner, healthier communities while contributing to sustainable 
                development across the continent.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-100">
            <CardHeader>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-7 h-7 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                To revolutionize waste management in Africa by providing accessible, efficient, and sustainable solutions 
                that empower communities to take control of their environmental health.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-100">
            <CardHeader>
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Globe className="w-7 h-7 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                A cleaner, greener Africa where waste is managed responsibly, recycling is the norm, and every citizen 
                plays an active role in environmental preservation for future generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="border-green-100 mb-8">
          <CardHeader>
            <CardTitle className="text-green-800">Our Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-green-800 mb-2">Sustainability</h3>
                <p className="text-sm text-green-700">
                  We prioritize eco-friendly practices and long-term environmental impact.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-green-800 mb-2">Community</h3>
                <p className="text-sm text-green-700">
                  We believe in empowering communities through collaboration and education.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-green-800 mb-2">Integrity</h3>
                <p className="text-sm text-green-700">
                  We operate with transparency, accountability, and dedication to our mission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <Card className="border-green-100 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle>Our Impact So Far</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="mb-1">10,000+</p>
                <p className="text-sm opacity-90">Active Users</p>
              </div>
              <div>
                <p className="mb-1">50,000+</p>
                <p className="text-sm opacity-90">Pickups Completed</p>
              </div>
              <div>
                <p className="mb-1">500 Tons</p>
                <p className="text-sm opacity-90">Waste Recycled</p>
              </div>
              <div>
                <p className="mb-1">2 Countries</p>
                <p className="text-sm opacity-90">And Growing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
