import { useState } from 'react';
import { ArrowLeft, Smartphone, CreditCard, Loader2, Phone } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface KenyaPaymentMethodsProps {
  amount: string;
  onBack: () => void;
  onPaymentSuccess: (method: string, reference: string) => void;
}

export function KenyaPaymentMethods({ amount, onBack, onPaymentSuccess }: KenyaPaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaybillModal, setShowPaybillModal] = useState(false);

  const handleMPesaSTK = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return;
    
    setIsProcessing(true);
    // Simulate STK push
    setTimeout(() => {
      setIsProcessing(false);
      const reference = `MPESA${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      onPaymentSuccess('M-Pesa STK Push', reference);
    }, 3000);
  };

  const handleCardPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const reference = `CARD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      onPaymentSuccess('Card Payment', reference);
    }, 2000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] flex items-center justify-center p-4">
        <div className="text-center animate-fadeIn">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center animate-pulse-eco">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
          </div>
          <h3 className="text-[#1B5E20] mb-2">Processing Payment...</h3>
          <p className="text-[#558B2F]">
            {selectedMethod === 'mpesa-stk' ? 'Check your phone for M-Pesa prompt' : 'Please wait'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-[#C8E6C9] sticky top-0 z-40">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#E8F5E9] hover:bg-[#C8E6C9] flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#4CAF50]" />
          </button>
          <div className="flex-1">
            <h2 className="text-[#1B5E20]">Payment Method</h2>
            <p className="text-sm text-[#558B2F]">KES {amount}</p>
          </div>
          <div className="text-2xl">🇰🇪</div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4 animate-fadeIn">
        {/* M-Pesa STK Push */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center shadow-md">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#1B5E20] mb-1">M-Pesa STK Push</h4>
                <p className="text-sm text-[#558B2F]">Instant secure prompt</p>
              </div>
            </div>

            {selectedMethod === 'mpesa-stk' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mpesa-phone" className="text-[#1B5E20]">M-Pesa Phone Number</Label>
                  <Input
                    id="mpesa-phone"
                    type="tel"
                    placeholder="0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9]"
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMethod(null)}
                    className="flex-1 h-12 rounded-2xl border-[#C8E6C9]"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleMPesaSTK}
                    disabled={phoneNumber.length < 10}
                    className="flex-1 h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white"
                  >
                    Send Prompt
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setSelectedMethod('mpesa-stk')}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
              >
                Pay with M-Pesa
              </Button>
            )}
          </CardContent>
        </Card>

        {/* M-Pesa Paybill */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-300 flex items-center justify-center shadow-md">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-[#1B5E20] mb-1">M-Pesa Paybill</h4>
                  <p className="text-sm text-[#558B2F]">Manual payment</p>
                </div>
              </div>
              <Button
                onClick={() => setShowPaybillModal(true)}
                variant="outline"
                className="rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card Payment */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#1B5E20] mb-1">Card Payment</h4>
                <p className="text-sm text-[#558B2F]">Visa / Mastercard</p>
              </div>
            </div>
            <Button
              onClick={handleCardPayment}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            >
              Pay with Card
            </Button>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-[#E8F5E9]">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h4 className="text-[#1B5E20] mb-2">Payment Tips</h4>
                <ul className="text-sm text-[#558B2F] space-y-1">
                  <li>• M-Pesa STK is instant and secure</li>
                  <li>• Check your phone for payment prompt</li>
                  <li>• Enter your M-Pesa PIN to complete</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paybill Modal */}
      <Dialog open={showPaybillModal} onOpenChange={setShowPaybillModal}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1B5E20]">M-Pesa Paybill Instructions</DialogTitle>
            <DialogDescription className="text-[#558B2F]">
              Follow these steps to complete your payment using M-Pesa Paybill
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="border-[#C8E6C9] rounded-2xl bg-[#E8F5E9]">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#558B2F]">1. Paybill Number:</span>
                  <span className="text-[#1B5E20]">406100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#558B2F]">2. Account Number:</span>
                  <span className="text-[#1B5E20]">0712345678</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#558B2F]">3. Amount:</span>
                  <span className="text-[#1B5E20]">KES {amount}</span>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-sm text-[#558B2F] space-y-2">
              <p>📱 Go to M-Pesa on your phone</p>
              <p>💰 Select Lipa na M-Pesa</p>
              <p>🏢 Choose Paybill</p>
              <p>✅ Enter details above and confirm</p>
            </div>

            <Button
              onClick={() => setShowPaybillModal(false)}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
