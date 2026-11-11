import { useEffect, useState } from 'react';
import { CheckCircle2, Download, Share2, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface PaymentSuccessProps {
  amount: string;
  currency: string;
  method: string;
  reference: string;
  onViewReceipt: () => void;
  onDone: () => void;
}

export function PaymentSuccess({
  amount,
  currency,
  method,
  reference,
  onViewReceipt,
  onDone,
}: PaymentSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Leaves Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fadeIn"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s forwards, float 3s ease-in-out ${i * 0.1}s infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <Leaf
                className="text-[#4CAF50] opacity-60"
                style={{
                  width: `${20 + Math.random() * 20}px`,
                  height: `${20 + Math.random() * 20}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-md w-full relative z-10 animate-fadeIn">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center shadow-2xl animate-pulse-eco">
            <CheckCircle2 className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-[#1B5E20] mb-2">Payment Successful!</h1>
          <p className="text-[#558B2F]">Your transaction has been completed 🎉</p>
        </div>

        {/* Summary Card */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-green-100 text-green-700 border-0 mb-3">
                Confirmed
              </Badge>
              <h2 className="text-[#1B5E20] mb-1">{currency} {amount}</h2>
              <p className="text-sm text-[#558B2F]">{method}</p>
            </div>

            <Separator className="bg-[#C8E6C9] mb-6" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#558B2F]">Amount Paid</span>
                <span className="text-[#1B5E20]">{currency} {amount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#558B2F]">Payment Method</span>
                <span className="text-[#1B5E20]">{method}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#558B2F]">Transaction ID</span>
                <code className="text-[#1B5E20] text-sm bg-[#E8F5E9] px-2 py-1 rounded">
                  {reference}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#558B2F]">Date & Time</span>
                <span className="text-[#1B5E20]">
                  {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onViewReceipt}
            variant="outline"
            className="w-full h-12 rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
          >
            <Download className="w-5 h-5 mr-2" />
            View Receipt
          </Button>
          
          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl border-[#C8E6C9] text-[#558B2F] hover:bg-[#E8F5E9]"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Receipt
          </Button>

          <Button
            onClick={onDone}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] text-white shadow-lg"
          >
            Done
          </Button>
        </div>

        {/* Thank You Message */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white mt-6">
          <CardContent className="p-6 text-center">
            <Leaf className="w-8 h-8 mx-auto mb-3" />
            <p className="text-sm">
              Thank you for choosing ECO-VISION! Together we're building a cleaner, greener future 🌿
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
