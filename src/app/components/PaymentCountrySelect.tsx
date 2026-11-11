import { Leaf, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface PaymentCountrySelectProps {
  onSelectCountry: (country: 'kenya' | 'nigeria') => void;
}

export function PaymentCountrySelect({ onSelectCountry }: PaymentCountrySelectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] via-[#E8F5E9] to-[#C8E6C9] flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#C8E6C9] sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[#1B5E20]">ECO-VISION</h2>
          </div>
          <p className="text-center text-sm text-[#558B2F]">Secure Payment Gateway</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 animate-fadeIn">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-[#1B5E20] mb-2">Choose Your Country</h1>
            <p className="text-[#558B2F]">Select your location to continue with payment</p>
          </div>

          <div className="space-y-4">
            {/* Kenya Card */}
            <Card
              onClick={() => onSelectCountry('kenya')}
              className="border-[#C8E6C9] rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-98 overflow-hidden group"
            >
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-[#E8F5E9] to-white p-6">
                  <div className="absolute top-0 right-0 opacity-10">
                    <Leaf className="w-32 h-32 text-[#4CAF50]" />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-5xl">
                        🇰🇪
                      </div>
                      <div>
                        <h3 className="text-[#1B5E20] mb-1">Kenya</h3>
                        <p className="text-sm text-[#558B2F]">M-Pesa & Card</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#4CAF50] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]"></div>
              </CardContent>
            </Card>

            {/* Nigeria Card */}
            <Card
              onClick={() => onSelectCountry('nigeria')}
              className="border-[#C8E6C9] rounded-3xl shadow-xl hover:shadow-2xl transition-all cursor-pointer active:scale-98 overflow-hidden group"
            >
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-[#E8F5E9] to-white p-6">
                  <div className="absolute top-0 right-0 opacity-10">
                    <Leaf className="w-32 h-32 text-[#4CAF50]" />
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-white shadow-lg flex items-center justify-center text-5xl">
                        🇳🇬
                      </div>
                      <div>
                        <h3 className="text-[#1B5E20] mb-1">Nigeria</h3>
                        <p className="text-sm text-[#558B2F]">OPay, USSD & More</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-[#4CAF50] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]"></div>
              </CardContent>
            </Card>
          </div>

          {/* Security Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#C8E6C9] shadow-md">
              <span className="text-xl">🔒</span>
              <span className="text-sm text-[#558B2F]">Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
