import { ArrowLeft, Leaf, Target, Users, Globe, Heart, Recycle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewAboutUsProps {
  onBack: () => void;
}

export function NewAboutUs({ onBack }: NewAboutUsProps) {
  const impactStats = [
    { value: '10,000+', label: 'Active Users', icon: Users },
    { value: '50,000+', label: 'Pickups', icon: Recycle },
    { value: '500 Tons', label: 'Recycled', icon: TrendingUp },
    { value: '2 Countries', label: 'And Growing', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#C8E6C9] sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
          </button>
          <div>
            <h2 className="text-[#1B5E20]">About ECO-VISION</h2>
            <p className="text-sm text-[#558B2F]">Clean Future. Smart Waste.</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {/* Hero Section */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-48 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1621848684419-eab31d0f2c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMG5hdHVyZSUyMGxlYXZlc3xlbnwxfHx8fDE3NjI1OTMwNDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nature"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <Leaf className="w-20 h-20 text-white animate-float" />
              </div>
            </div>
            <div className="p-6">
              <p className="text-[#558B2F] leading-relaxed">
                ECO-VISION is transforming waste management across Africa. We connect communities with 
                efficient waste services, promote recycling, and foster environmental awareness for a 
                cleaner, greener future.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#1B5E20] mb-2">Our Mission</h4>
                  <p className="text-sm text-[#558B2F]">
                    To revolutionize waste management in Africa through accessible, efficient, and 
                    sustainable solutions that empower communities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2196F3] to-[#64B5F6] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-[#1B5E20] mb-2">Our Vision</h4>
                  <p className="text-sm text-[#558B2F]">
                    A cleaner, greener Africa where waste is managed responsibly and every citizen 
                    plays an active role in environmental preservation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-[#1B5E20] mb-4">Core Values</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-[#1B5E20]">Sustainability</p>
                  <p className="text-sm text-[#558B2F]">Eco-friendly practices for long-term impact</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-[#1B5E20]">Community</p>
                  <p className="text-sm text-[#558B2F]">Empowering through collaboration</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-[#1B5E20]">Integrity</p>
                  <p className="text-sm text-[#558B2F]">Transparent and accountable service</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white p-6">
              <h3 className="mb-2 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Our Impact So Far
              </h3>
              <p className="text-sm text-white/90 mb-6">Making a difference across Africa 🌍</p>
              
              <div className="grid grid-cols-2 gap-4">
                {impactStats.map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-2xl mb-1">{stat.value}</p>
                    <p className="text-sm text-white/90">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-2 bg-[#E8F5E9] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm text-[#4CAF50]">75%</span>
              </div>
              <p className="text-sm text-[#558B2F]">
                Progress towards our 2025 goal: 1,000 tons recycled ♻️
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Countries */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-[#1B5E20] mb-4">Where We Operate</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-[#E8F5E9] rounded-2xl">
                <span className="text-4xl">🇳🇬</span>
                <div>
                  <p className="text-[#1B5E20]">Nigeria</p>
                  <p className="text-sm text-[#558B2F]">Lagos, Abuja, Port Harcourt</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#E8F5E9] rounded-2xl">
                <span className="text-4xl">🇰🇪</span>
                <div>
                  <p className="text-[#1B5E20]">Kenya</p>
                  <p className="text-sm text-[#558B2F]">Nairobi, Mombasa, Kisumu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]">
          <CardContent className="p-6 text-center text-white">
            <Leaf className="w-12 h-12 mx-auto mb-3" />
            <h4 className="mb-2">Join the Green Revolution</h4>
            <p className="text-sm text-white/90 mb-4">
              Together, we can create a cleaner, healthier Africa
            </p>
            <Button
              onClick={onBack}
              className="bg-white text-[#4CAF50] hover:bg-white/90 rounded-2xl"
            >
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
