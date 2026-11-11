import { useState } from 'react';
import { ArrowLeft, Wallet, Phone, Building2, CreditCard, Loader2, Copy, Check } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';

interface NigeriaPaymentMethodsProps {
  amount: string;
  onBack: () => void;
  onPaymentSuccess: (method: string, reference: string) => void;
}

export function NigeriaPaymentMethods({ amount, onBack, onPaymentSuccess }: NigeriaPaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUSSDModal, setShowUSSDModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const ussdCodes = [
    { bank: 'GTBank', code: '*737*50*' + amount + '#', logo: '🏦' },
    { bank: 'Access Bank', code: '*901*50*' + amount + '#', logo: '🏦' },
    { bank: 'Zenith Bank', code: '*966*50*' + amount + '#', logo: '🏦' },
    { bank: 'UBA', code: '*919*50*' + amount + '#', logo: '🏦' },
  ];

  const accountDetails = {
    bank: 'Providus Bank',
    accountNumber: '1234567890',
    accountName: 'ECO-VISION PAYMENTS',
  };

  const handleOPayPayment = async () => {
    if (!phoneNumber || !otp) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const reference = `OPAY${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      onPaymentSuccess('OPay Wallet', reference);
    }, 2500);
  };

  const handleCardPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const reference = `CARD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      onPaymentSuccess('Card Payment', reference);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] flex items-center justify-center p-4">
        <div className="text-center animate-fadeIn">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center animate-pulse-eco">
            <Loader2 className="w-16 h-16 text-white animate-spin" />
          </div>
          <h3 className="text-[#1B5E20] mb-2">Processing Payment...</h3>
          <p className="text-[#558B2F]">Please wait</p>
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
            <p className="text-sm text-[#558B2F]">₦{amount}</p>
          </div>
          <div className="text-2xl">🇳🇬</div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-4 animate-fadeIn">
        {/* OPay Wallet */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center shadow-md">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#1B5E20] mb-1">OPay Wallet</h4>
                <p className="text-sm text-[#558B2F]">Instant secure payment</p>
              </div>
            </div>

            {selectedMethod === 'opay' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="opay-phone" className="text-[#1B5E20]">OPay Phone Number</Label>
                  <Input
                    id="opay-phone"
                    type="tel"
                    placeholder="08012345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opay-otp" className="text-[#1B5E20]">OTP Code</Label>
                  <Input
                    id="opay-otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-12 rounded-2xl border-[#C8E6C9]"
                    maxLength={6}
                  />
                  <p className="text-xs text-[#558B2F]">OTP sent to your phone</p>
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
                    onClick={handleOPayPayment}
                    disabled={phoneNumber.length < 11 || otp.length < 6}
                    className="flex-1 h-12 rounded-2xl bg-green-600 hover:bg-green-700 text-white"
                  >
                    Confirm Payment
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setSelectedMethod('opay')}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
              >
                Pay with OPay
              </Button>
            )}
          </CardContent>
        </Card>

        {/* USSD Payment */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-[#1B5E20] mb-1">Pay via USSD</h4>
                  <p className="text-sm text-[#558B2F]">All banks supported</p>
                </div>
              </div>
              <Button
                onClick={() => setShowUSSDModal(true)}
                variant="outline"
                className="rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
              >
                View Codes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bank Transfer */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center shadow-md">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-[#1B5E20] mb-1">Bank Transfer</h4>
                  <p className="text-sm text-[#558B2F]">Auto-verify payment</p>
                </div>
              </div>
              <Button
                onClick={() => setShowBankModal(true)}
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center shadow-md">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#1B5E20] mb-1">Card Payment</h4>
                <p className="text-sm text-[#558B2F]">Visa / Mastercard / Verve</p>
              </div>
            </div>
            <Button
              onClick={handleCardPayment}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
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
                  <li>• OPay is fastest for instant confirmation</li>
                  <li>• USSD works on any phone</li>
                  <li>• Bank transfers auto-verify within minutes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* USSD Modal */}
      <Dialog open={showUSSDModal} onOpenChange={setShowUSSDModal}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1B5E20]">USSD Payment Codes</DialogTitle>
            <DialogDescription className="text-[#558B2F]">
              Dial the code for your bank on your phone to complete payment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            
            {ussdCodes.map((item, idx) => (
              <Card key={idx} className="border-[#C8E6C9] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.logo}</span>
                      <span className="text-[#1B5E20]">{item.bank}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-[#E8F5E9] px-3 py-2 rounded-xl text-[#1B5E20]">
                      {item.code}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(item.code)}
                      className="rounded-xl"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-sm text-[#558B2F]">
                📱 Dial the code, follow prompts, and enter your PIN to complete payment
              </p>
            </div>

            <Button
              onClick={() => setShowUSSDModal(false)}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Transfer Modal */}
      <Dialog open={showBankModal} onOpenChange={setShowBankModal}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#1B5E20]">Bank Transfer Details</DialogTitle>
            <DialogDescription className="text-[#558B2F]">
              Transfer to the account below and payment will be auto-verified
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="border-[#C8E6C9] rounded-2xl bg-[#E8F5E9]">
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-[#558B2F] mb-1">Bank Name</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#1B5E20]">{accountDetails.bank}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#558B2F] mb-1">Account Number</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[#1B5E20]">{accountDetails.accountNumber}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(accountDetails.accountNumber)}
                      className="rounded-xl"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#558B2F] mb-1">Account Name</p>
                  <p className="text-[#1B5E20]">{accountDetails.accountName}</p>
                </div>
                <div>
                  <p className="text-sm text-[#558B2F] mb-1">Amount</p>
                  <p className="text-[#1B5E20] text-xl">₦{amount}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-2 text-sm text-[#558B2F]">
              <p>✅ Transfer exactly ₦{amount}</p>
              <p>⏱️ Payment verifies in 2-5 minutes</p>
              <p>📧 You'll receive confirmation via email/SMS</p>
            </div>

            <Badge className="w-full justify-center bg-green-100 text-green-700 border-0 py-2 rounded-xl">
              Auto-verify enabled
            </Badge>

            <Button
              onClick={() => setShowBankModal(false)}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] text-white"
            >
              I've Made the Transfer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
