import { ArrowLeft, Phone, MessageSquare, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface USSDCompanionProps {
  onBack: () => void;
}

export function USSDCompanion({ onBack }: USSDCompanionProps) {
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
            <h2 className="text-[#1B5E20]">USSD Access</h2>
            <p className="text-sm text-[#558B2F]">No smartphone? No problem!</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {/* Info Card */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white">
          <CardContent className="p-6 text-center">
            <Phone className="w-12 h-12 mx-auto mb-3" />
            <h3 className="mb-2">Dial *123# for ECO-VISION</h3>
            <p className="text-sm text-white/90">
              Access our services from any phone, even without internet
            </p>
          </CardContent>
        </Card>

        {/* USSD Menu Simulation */}
        <Card className="border-gray-400 rounded-3xl shadow-xl bg-gray-900">
          <CardContent className="p-0">
            {/* Phone Screen */}
            <div className="bg-white rounded-t-3xl p-4">
              <div className="bg-gray-100 rounded-2xl p-4 font-mono text-sm">
                <div className="bg-white p-3 rounded-lg mb-3 shadow-sm">
                  <p className="text-gray-800 mb-2">*123#</p>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <p className="text-gray-700 mb-3">ECO-VISION</p>
                  
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-800">1. Pickup schedule</p>
                    <p className="text-gray-800">2. Report overflow</p>
                    <p className="text-gray-800">3. Find kiosk</p>
                    <p className="text-gray-800">4. Request bulky pickup</p>
                    <p className="text-gray-800">5. Help</p>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-gray-500 text-xs">Reply:</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-white p-2 rounded text-center text-gray-400 text-xs">
                    Cancel
                  </div>
                  <div className="flex-1 bg-[#4CAF50] p-2 rounded text-center text-white text-xs">
                    Send
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phone Bottom */}
            <div className="bg-gray-900 rounded-b-3xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gray-700"></div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Confirmation Example */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-[#1B5E20]">SMS Confirmations</h4>
                <p className="text-sm text-[#558B2F]">Receive updates via text</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
                <p className="text-xs text-gray-500 mb-1">ECO-VISION</p>
                <p className="text-sm text-gray-800">
                  Your pickup is scheduled for Nov 12, 9-11AM. Ticket: #ECO123. 
                  Reply CANCEL to cancel.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">ECO-VISION</p>
                <p className="text-sm text-gray-800">
                  Report #ECO456 received. Overflow at Lekki Phase 1 will be addressed 
                  within 24hrs. Thank you! 🌿
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-[#1B5E20] mb-4">USSD Features</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">📅</span>
                </div>
                <div>
                  <p className="text-[#1B5E20]">Schedule Pickups</p>
                  <p className="text-sm text-[#558B2F]">Book waste collection via USSD menu</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">⚠️</span>
                </div>
                <div>
                  <p className="text-[#1B5E20]">Report Issues</p>
                  <p className="text-sm text-[#558B2F]">Alert authorities about overflow</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">📍</span>
                </div>
                <div>
                  <p className="text-[#1B5E20]">Find Kiosks</p>
                  <p className="text-sm text-[#558B2F]">Get nearest recycling locations via SMS</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">💬</span>
                </div>
                <div>
                  <p className="text-[#1B5E20]">SMS Updates</p>
                  <p className="text-sm text-[#558B2F]">Receive confirmations and notifications</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Note */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-[#E8F5E9]">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Menu className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h4 className="text-[#1B5E20] mb-2">Inclusive by Design</h4>
                <p className="text-sm text-[#558B2F]">
                  Our USSD service ensures everyone can access ECO-VISION, regardless of smartphone 
                  availability or internet connectivity. Making waste management truly accessible 
                  across Africa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={onBack}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
