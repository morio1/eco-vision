import { toast } from 'sonner';
import { ArrowLeft, Download, Share2, Leaf, Calendar, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface PaymentReceiptProps {
  transactionId: string;
  amount: string;
  currency: string;
  method: string;
  date: string;
  service: string;
  onBack: () => void;
}

export function PaymentReceipt({
  transactionId,
  amount,
  currency,
  method,
  date,
  service,
  onBack,
}: PaymentReceiptProps) {
  const handleDownload = () => {
    const text = ['ECO-VISION DEMO RECEIPT — NO MONEY TRANSFERRED', transactionId, currency + ' ' + amount, method, date, service].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const link = document.createElement('a'); link.href = url; link.download = 'eco-demo-receipt.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleShare = () => {
    const text = 'ECO-VISION demo receipt (no money transferred): ' + transactionId + ' ' + currency + ' ' + amount;
    if (navigator.share) navigator.share({ title: 'Demo receipt', text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast.success('Demo receipt copied')).catch(() => toast.error('Could not copy. Download the receipt instead.'));
    else toast.info('Use Download to save this receipt.');
  };

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
            <h2 className="text-[#1B5E20]">Payment Receipt</h2>
            <p className="text-sm text-[#558B2F]">Transaction details</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 animate-fadeIn">
        {/* Receipt Card */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-xl overflow-hidden">
          <CardContent className="p-0">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-20">
                <Leaf className="w-40 h-40 text-white animate-float" />
              </div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2">ECO-VISION</h3>
                <p className="text-sm text-white/90">Payment Receipt</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="px-6 py-4 bg-white flex justify-center">
              <Badge className="bg-green-100 text-green-700 border-0 px-4 py-2">
                Demo payment — no money transferred
              </Badge>
            </div>

            <Separator className="bg-[#C8E6C9]" />

            {/* Amount Section */}
            <div className="px-6 py-6 bg-gradient-to-br from-[#E8F5E9] to-white text-center">
              <p className="text-sm text-[#558B2F] mb-2">Amount Paid</p>
              <h1 className="text-[#1B5E20]">{currency} {amount}</h1>
            </div>

            <Separator className="bg-[#C8E6C9]" />

            {/* Details Section */}
            <div className="px-6 py-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <span className="text-lg">🗑️</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#558B2F]">Service</p>
                    <p className="text-[#1B5E20]">{service}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#558B2F]">Payment Method</p>
                    <p className="text-[#1B5E20]">{method}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
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

              <Separator className="bg-[#C8E6C9]" />

              <div className="bg-[#E8F5E9] rounded-2xl p-4">
                <p className="text-sm text-[#558B2F] mb-2">Transaction ID</p>
                <code className="text-[#1B5E20] break-all">{transactionId}</code>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#E8F5E9] text-center">
              <p className="text-xs text-[#558B2F]">
                This is an official receipt from ECO-VISION
              </p>
              <p className="text-xs text-[#558B2F] mt-1">
                For support, contact: support@eco-vision.com
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleDownload}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] hover:to-[#81C784] text-white shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full h-12 rounded-2xl border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F5E9]"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Receipt
          </Button>
        </div>

        {/* Info Card */}
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg bg-[#E8F5E9]">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h4 className="text-[#1B5E20] mb-2">Receipt Information</h4>
                <ul className="text-sm text-[#558B2F] space-y-1">
                  <li>• Keep this receipt for your records</li>
                  <li>• Valid as proof of payment</li>
                  <li>• Downloadable in PDF format</li>
                  <li>• Accessible from Payment History</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
