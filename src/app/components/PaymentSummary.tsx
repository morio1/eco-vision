import { ArrowLeft, Calendar, Trash2, Leaf, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface PaymentSummaryProps {
  country: 'kenya' | 'nigeria';
  amount: string;
  currency: string;
  serviceType: string;
  date: string;
  onBack: () => void;
  onContinue: () => void;
}

export function PaymentSummary({
  country,
  amount,
  currency,
  serviceType,
  date,
  onBack,
  onContinue,
}: PaymentSummaryProps) {
  const countryFlag = country === 'kenya' ? '🇰🇪' : '🇳🇬';
  const countryName = country === 'kenya' ? 'Kenya' : 'Nigeria';

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
          <div className="flex-1">
            <h2 className="text-[#1B5E20]">Complete Payment</h2>
            <p className="text-sm text-[#558B2F]">Review and proceed</p>
          </div>
          <div className="text-2xl">{countryFlag}</div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {/* Amount Card */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-20">
                <Leaf className="w-40 h-40 text-white animate-float" />
              </div>
              <div className="relative z-10 text-center">
                <p className="text-sm text-white/80 mb-2">Total Amount</p>
                <h1 className="text-5xl mb-2">{currency} {amount}</h1>
                <Badge className="bg-white/20 text-white border-0">
                  {countryName}
                </Badge>
              </div>
            </div>

            {/* Summary Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#558B2F]">Service</p>
                    <p className="text-[#1B5E20]">{serviceType}</p>
                  </div>
                </div>
                <Badge className="bg-[#E8F5E9] text-[#1B5E20] border-0">
                  {currency} {amount}
                </Badge>
              </div>

              <Separator className="bg-[#C8E6C9]" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-sm text-[#558B2F]">Date & Time</p>
                  <p className="text-[#1B5E20]">{date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Info */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <h4 className="text-[#1B5E20] mb-3">Payment Methods Available</h4>
            <div className="space-y-2 text-sm text-[#558B2F]">
              {country === 'kenya' ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>M-Pesa STK Push</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>M-Pesa Paybill</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Card Payment (Visa/Mastercard)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>OPay Wallet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>USSD (All Banks)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Bank Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Card Payment (Visa/Mastercard/Verve)</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-amber-200 rounded-3xl shadow-lg bg-amber-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <h4 className="text-[#1B5E20] mb-2">Secure Payment</h4>
                <p className="text-sm text-[#558B2F]">
                  Your payment is secured with 256-bit SSL encryption. We never store your payment details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] text-white shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Choose Payment Method</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
