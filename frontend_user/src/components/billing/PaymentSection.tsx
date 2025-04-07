
import { useState } from 'react';
import { BillingSummary, PaymentMethod } from '../data/mockData';
import { CreditCard, DollarSign, Download, Mail, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentSectionProps {
  summary: BillingSummary;
  onUpdateSummary: (summary: BillingSummary) => void;
}

const PaymentSection = ({ summary, onUpdateSummary }: PaymentSectionProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | undefined>(summary.paymentMethod);

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onUpdateSummary({
      ...summary,
      paymentMethod: method
    });
  };

  const handleProcessPayment = () => {
    if (!selectedMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method to continue.",
        variant: "destructive"
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Processing payment",
      description: "Your payment is being processed...",
    });

    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      onUpdateSummary({
        ...summary,
        status: 'paid',
        paymentMethod: selectedMethod
      });

      toast({
        title: "Payment successful",
        description: "Thank you for your payment!",
        variant: "default",
      });
    }, 2000);
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice downloaded",
      description: "Your invoice has been downloaded as PDF.",
    });
  };

  const handlePrintInvoice = () => {
    toast({
      title: "Printing invoice",
      description: "Your invoice is being sent to the printer.",
    });
  };

  const handleEmailInvoice = () => {
    toast({
      title: "Invoice sent",
      description: "Your invoice has been sent to your email address.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="section-card">
      <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
      
      <div className="mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-gray-600 mb-1">Amount Due</p>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(summary.total)}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <button
              className={`payment-method-button ${selectedMethod === 'card' ? 'payment-method-button-active' : 'payment-method-button-inactive'}`}
              onClick={() => handleSelectPaymentMethod('card')}
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </div>
            </button>
            
            <button
              className={`payment-method-button ${selectedMethod === 'cash' ? 'payment-method-button-active' : 'payment-method-button-inactive'}`}
              onClick={() => handleSelectPaymentMethod('cash')}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Cash</span>
              </div>
            </button>
            
            <button
              className={`payment-method-button ${selectedMethod === 'paypal' ? 'payment-method-button-active' : 'payment-method-button-inactive'}`}
              onClick={() => handleSelectPaymentMethod('paypal')}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.084-.024.13a.804.804 0 0 1-.794.68h-2.52a.5.5 0 0 1-.488-.62l.04-.22 1.006-6.5.022-.14a.795.795 0 0 1 .79-.68h2.5c2.152 0 3.85-.346 5.1-1.084 1.21-.716 2.166-1.825 2.794-3.293.266-.623.439-1.198.53-1.714.056-.32.08-.604.077-.845v-.36c0-.664-.29-1.254-.718-1.676.17-.42.378-.794.648-1.1.693.44 1.217 1.072 1.519 1.8.3.784.224 1.734-.195 2.725-.02.061-.05.18-.05.18zm-10.06 5.423a.805.805 0 0 1-.794.68h-.5c-3.238 0-5.776-1.314-6.516-5.12-.256-1.313-.19-2.447.3-3.327-.419.991-.495 1.94-.197 2.725.245.64.67 1.204 1.266 1.635-.46.42-.73 1.01-.73 1.676v.36c-.001 2.407 1.615 4.927 4.76 4.927h3.273a.55.55 0 0 0 .546-.459l.678-4.35a.5.5 0 0 0-.487-.62h-1.647l.046-.218z" />
                </svg>
                <span>PayPal</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleProcessPayment}
            disabled={summary.status === 'paid'}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
              summary.status === 'paid'
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {summary.status === 'paid' ? 'Paid' : 'Process Payment'}
          </button>
        </div>
        
        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={handleDownloadInvoice} 
            className="invoice-action-button"
            title="Download as PDF"
          >
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={handlePrintInvoice} 
            className="invoice-action-button"
            title="Print Invoice"
          >
            <Printer className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={handleEmailInvoice} 
            className="invoice-action-button"
            title="Email Invoice"
          >
            <Mail className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;