import { XCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface PaymentFailedProps {
  amount: string;
  currency: string;
  reason: string;
  onTryAgain: () => void;
  onChangeMethod: () => void;
  onCancel: () => void;
}

export function PaymentFailed({
  amount,
  currency,
  reason,
  onTryAgain,
  onChangeMethod,
  onCancel,
}: PaymentFailedProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FFF9] to-[#E8F5E9] flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fadeIn">
        {/* Failed Icon */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-400 rounded-full flex items-center justify-center shadow-2xl">
            <XCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-[#1B5E20] mb-2">Payment Failed</h2>
          <p className="text-[#558B2F]">We couldn't process your payment</p>
        </div>

        {/* Details Card */}
        <Card className="border-red-200 rounded-3xl shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Badge className="bg-red-100 text-red-700 border-0 mb-3">
                Failed
              </Badge>
              <h3 className="text-[#1B5E20] mb-1">{currency} {amount}</h3>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600">⚠️</span>
                </div>
                <div>
                  <h4 className="text-red-900 mb-1">Reason</h4>
                  <p className="text-sm text-red-700">{reason}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-[#558B2F]">
              <h4 className="text-[#1B5E20] mb-3">Common Solutions:</h4>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Check your account balance</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Verify your payment details</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Ensure stable internet connection</span>
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <span>Try a different payment method</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onTryAgain}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] text-white shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={onChangeMethod}
            variant="outline"
            className="w-full h-12 rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
          >
            Choose Another Method
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full h-12 rounded-2xl border-[#C8E6C9] text-[#558B2F] hover:bg-[#E8F5E9]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Cancel Payment
          </Button>
        </div>

        {/* Support Info */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg mt-6 bg-[#E8F5E9]">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="text-[#1B5E20] mb-2">Need Help?</h4>
            <p className="text-sm text-[#558B2F] mb-4">
              Contact our support team if the issue persists
            </p>
            <Button
              variant="outline"
              className="rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-white"
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
