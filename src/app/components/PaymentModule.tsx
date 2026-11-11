import { add, read } from '../lib/storage';
import { useState } from 'react';
import { PaymentCountrySelect } from './PaymentCountrySelect';
import { PaymentSummary } from './PaymentSummary';
import { KenyaPaymentMethods } from './KenyaPaymentMethods';
import { NigeriaPaymentMethods } from './NigeriaPaymentMethods';
import { PaymentSuccess } from './PaymentSuccess';
import { PaymentFailed } from './PaymentFailed';
import { PaymentHistory } from './PaymentHistory';
import { PaymentReceipt } from './PaymentReceipt';

type PaymentState = 
  | 'country-select' 
  | 'summary' 
  | 'payment-method' 
  | 'processing' 
  | 'success' 
  | 'failed'
  | 'history'
  | 'receipt';

interface PaymentData {
  country?: 'kenya' | 'nigeria';
  amount: string;
  currency: string;
  serviceType: string;
  date: string;
  paymentMethod?: string;
  reference?: string;
  receiptId?: string;
}

interface PaymentModuleProps {
  onClose: () => void;
  initialData?: Partial<PaymentData>;
  startWithHistory?: boolean;
}

export function PaymentModule({ 
  onClose, 
  initialData,
  startWithHistory = false,
}: PaymentModuleProps) {
  const [state, setState] = useState<PaymentState>(
    startWithHistory ? 'history' : 'country-select'
  );
  
  const [paymentData, setPaymentData] = useState<PaymentData>({
    amount: initialData?.amount || '180',
    currency: initialData?.currency || 'KES',
    serviceType: initialData?.serviceType || 'Waste Pickup Service',
    date: initialData?.date || new Date().toLocaleString(),
    country: initialData?.country,
  });

  const handleCountrySelect = (country: 'kenya' | 'nigeria') => {
    setPaymentData({
      ...paymentData,
      country,
      currency: country === 'kenya' ? 'KES' : '₦',
      amount: country === 'kenya' ? '180' : '2,500',
    });
    setState('summary');
  };

  const handleContinueFromSummary = () => {
    setState('payment-method');
  };

  const handlePaymentSuccess = (method: string, reference: string) => {
    try { add('payments', { amount: paymentData.amount, currency: paymentData.currency, method, reference, service: paymentData.serviceType, date: new Date().toLocaleString(), status: 'success', demo: true }); } catch { setState('failed'); return; }
    setPaymentData({
      ...paymentData,
      paymentMethod: method,
      reference,
    });
    setState('success');
  };

  const handlePaymentFailed = () => {
    setState('failed');
  };

  const handleViewReceipt = (id?: string) => {
    if (id) {
      const transaction = read<any[]>('payments', []).find(item => item.reference === id);
      if (!transaction) return;
      setPaymentData({ ...paymentData, amount: transaction.amount, currency: transaction.currency, date: transaction.date, serviceType: transaction.service, paymentMethod: transaction.method, reference: id, receiptId: id });
    }
    setState('receipt');
  };

  const handleBackToCountrySelect = () => {
    setState('country-select');
  };

  const handleBackToSummary = () => {
    setState('summary');
  };

  const handleBackToPaymentMethod = () => {
    setState('payment-method');
  };

  const handleDone = () => {
    onClose();
  };

  const handleTryAgain = () => {
    setState('payment-method');
  };

  const handleChangeMethod = () => {
    setState('payment-method');
  };

  const handleViewHistory = () => {
    setState('history');
  };

  const handleBackFromHistory = () => {
    setState('country-select');
  };

  const handleBackFromReceipt = () => {
    if (startWithHistory) {
      setState('history');
    } else {
      setState('success');
    }
  };

  // Render different states
  switch (state) {
    case 'country-select':
      return <PaymentCountrySelect onSelectCountry={handleCountrySelect} />;

    case 'summary':
      return (
        <PaymentSummary
          country={paymentData.country!}
          amount={paymentData.amount}
          currency={paymentData.currency}
          serviceType={paymentData.serviceType}
          date={paymentData.date}
          onBack={handleBackToCountrySelect}
          onContinue={handleContinueFromSummary}
        />
      );

    case 'payment-method':
      if (paymentData.country === 'kenya') {
        return (
          <KenyaPaymentMethods
            amount={paymentData.amount}
            onBack={handleBackToSummary}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      } else {
        return (
          <NigeriaPaymentMethods
            amount={paymentData.amount}
            onBack={handleBackToSummary}
            onPaymentSuccess={handlePaymentSuccess}
          />
        );
      }

    case 'success':
      return (
        <PaymentSuccess
          amount={paymentData.amount}
          currency={paymentData.currency}
          method={paymentData.paymentMethod!}
          reference={paymentData.reference!}
          onViewReceipt={() => handleViewReceipt()}
          onDone={handleDone}
        />
      );

    case 'failed':
      return (
        <PaymentFailed
          amount={paymentData.amount}
          currency={paymentData.currency}
          reason="Insufficient funds. Please check your balance and try again."
          onTryAgain={handleTryAgain}
          onChangeMethod={handleChangeMethod}
          onCancel={handleDone}
        />
      );

    case 'history':
      return (
        <PaymentHistory
          onBack={onClose}
          onViewReceipt={handleViewReceipt}
        />
      );

    case 'receipt':
      return (
        <PaymentReceipt
          transactionId={paymentData.receiptId || paymentData.reference || 'UNKNOWN'}
          amount={paymentData.amount}
          currency={paymentData.currency}
          method={paymentData.paymentMethod || 'M-Pesa STK Push'}
          date={paymentData.date}
          service={paymentData.serviceType}
          onBack={handleBackFromReceipt}
        />
      );

    default:
      return <PaymentCountrySelect onSelectCountry={handleCountrySelect} />;
  }
}
