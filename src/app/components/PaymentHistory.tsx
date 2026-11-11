import { read } from '../lib/storage';
import { ArrowLeft, Calendar, Wallet, CreditCard, Smartphone, Building2, Phone, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface PaymentHistoryProps {
  onBack: () => void;
  onViewReceipt: (id: string) => void;
}

interface Transaction {
  id: string;
  amount: string;
  currency: string;
  method: string;
  date: string;
  status: 'success' | 'failed' | 'pending';
  service: string;
  icon: typeof Wallet;
}

const transactions: Transaction[] = [
  {
    id: 'MPESA4F8X9K2L',
    amount: '180',
    currency: 'KES',
    method: 'M-Pesa STK Push',
    date: '2024-11-15 14:32',
    status: 'success',
    service: 'Waste Pickup',
    icon: Smartphone,
  },
  {
    id: 'OPAYH7K3M9P1',
    amount: '2,500',
    currency: '₦',
    method: 'OPay Wallet',
    date: '2024-11-12 09:15',
    status: 'success',
    service: 'Overflow Fine',
    icon: Wallet,
  },
  {
    id: 'CARD9X2L5N8K',
    amount: '350',
    currency: 'KES',
    method: 'Card Payment',
    date: '2024-11-08 16:45',
    status: 'success',
    service: 'Waste Pickup',
    icon: CreditCard,
  },
  {
    id: 'USSD2M8K4L9P',
    amount: '1,800',
    currency: '₦',
    method: 'USSD - GTBank',
    date: '2024-11-05 11:20',
    status: 'failed',
    service: 'Bulk Pickup',
    icon: Phone,
  },
  {
    id: 'BANK7L3M9K5N',
    amount: '3,200',
    currency: '₦',
    method: 'Bank Transfer',
    date: '2024-11-01 08:30',
    status: 'success',
    service: 'Monthly Fee',
    icon: Building2,
  },
];

export function PaymentHistory({ onBack, onViewReceipt }: PaymentHistoryProps) {
  const transactions: Transaction[] = read<any[]>('payments', []).map(item => ({ ...item, id: item.reference, icon: Wallet, service: 'Demo — ' + item.service }));
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filterTransactions = (status?: string) => {
    if (!status) return transactions;
    return transactions.filter(t => t.status === status);
  };

  const TransactionList = ({ items }: { items: Transaction[] }) => (
    <div className="space-y-3">
      {items.length === 0 ? (
        <Card className="border-[#C8E6C9] rounded-3xl shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8F5E9] flex items-center justify-center">
              <Calendar className="w-8 h-8 text-[#558B2F]" />
            </div>
            <p className="text-[#558B2F]">No transactions found</p>
          </CardContent>
        </Card>
      ) : (
        items.map((transaction) => (
          <Card
            key={transaction.id}
            onClick={() => onViewReceipt(transaction.id)}
            className="border-[#C8E6C9] rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl ${
                  transaction.status === 'success' 
                    ? 'bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]' 
                    : transaction.status === 'failed'
                    ? 'bg-gradient-to-br from-red-500 to-red-400'
                    : 'bg-gradient-to-br from-amber-500 to-amber-400'
                } flex items-center justify-center shadow-md flex-shrink-0`}>
                  <transaction.icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-[#1B5E20] mb-1">{transaction.service}</h4>
                      <p className="text-sm text-[#558B2F]">{transaction.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#1B5E20] mb-1">
                        {transaction.currency} {transaction.amount}
                      </p>
                      <Badge className={`${getStatusColor(transaction.status)} border-0 text-xs`}>
                        {getStatusText(transaction.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#558B2F]">
                      <Calendar className="w-3 h-3" />
                      <span>{transaction.date}</span>
                    </div>
                    <code className="text-xs text-[#558B2F] bg-[#E8F5E9] px-2 py-1 rounded">
                      {transaction.id}
                    </code>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#558B2F] flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

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
            <h2 className="text-[#1B5E20]">Payment History</h2>
            <p className="text-sm text-[#558B2F]">{transactions.length} transactions</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 animate-fadeIn">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-[#C8E6C9] rounded-2xl shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <p className="text-2xl text-[#4CAF50] mb-1">
                {filterTransactions('success').length}
              </p>
              <p className="text-xs text-[#558B2F]">Success</p>
            </CardContent>
          </Card>

          <Card className="border-[#C8E6C9] rounded-2xl shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-xl">❌</span>
              </div>
              <p className="text-2xl text-red-600 mb-1">
                {filterTransactions('failed').length}
              </p>
              <p className="text-xs text-[#558B2F]">Failed</p>
            </CardContent>
          </Card>

          <Card className="border-[#C8E6C9] rounded-2xl shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-xl">⏳</span>
              </div>
              <p className="text-2xl text-amber-600 mb-1">
                {filterTransactions('pending').length}
              </p>
              <p className="text-xs text-[#558B2F]">Pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid grid-cols-4 bg-white border border-[#C8E6C9] rounded-2xl p-1">
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white">
              All
            </TabsTrigger>
            <TabsTrigger value="success" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Success
            </TabsTrigger>
            <TabsTrigger value="failed" className="rounded-xl data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Failed
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl data-[state=active]:bg-amber-600 data-[state=active]:text-white">
              Pending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <TransactionList items={transactions} />
          </TabsContent>

          <TabsContent value="success">
            <TransactionList items={filterTransactions('success')} />
          </TabsContent>

          <TabsContent value="failed">
            <TransactionList items={filterTransactions('failed')} />
          </TabsContent>

          <TabsContent value="pending">
            <TransactionList items={filterTransactions('pending')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
