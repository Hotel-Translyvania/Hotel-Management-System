import { useState } from 'react';
import { BillingSummary, PaymentMethod } from '../../data/mockData';
import { CreditCard, DollarSign, Download, Mail, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

interface PaymentSectionProps {
  summary: BillingSummary;
  onUpdateSummary: (summary: BillingSummary) => void;
}

const PaymentSection = ({ summary, onUpdateSummary }: PaymentSectionProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | undefined>(summary.paymentMethod);
  const [loading, setLoading] = useState(false);

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onUpdateSummary({
      ...summary,
      paymentMethod: method
    });
  };

  const handleProcessPayment = async () => {
    if (!selectedMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method to continue.",
        variant: "destructive"
      });
      return;
    }

    if (selectedMethod === "card") {
      try {
        setLoading(true);
        toast({
          title: "Redirecting...",
          description: "Taking you to the payment gateway.",
        });

        const bookingId = "0ee52c99-d74b-4326-ae3d-2e136e2e0baa"; // fallback
        const payload = {
          price: (summary.serviceCharge + summary.subtotal + summary.tax) * 100, // example amount in cents
          currency: "usd",
        };
        console.log('subtotal',summary.subtotal);
        console.log('total',summary.total);


        const response = await api.post(`/payments/initiate/${bookingId}`, payload);
        console.log(response);  
        const sessionUrl = response.data?.url || response.data?.sessionUrl;

        if (sessionUrl) {
          window.location.href = sessionUrl;
        } else {
          throw new Error("No session URL returned from API.");
        }
      } catch (error: any) {
        toast({
          title: "Payment initiation failed",
          description: error?.response?.data?.message || "Something went wrong.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate other methods
      toast({
        title: "Processing payment",
        description: "Your payment is being processed...",
      });

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
    }
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
                  <path d="M20.067 8.478c.492.88.556 2.014.3 3.327..."/>
                </svg>
                <span>PayPal</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleProcessPayment}
            disabled={summary.status === 'paid' || loading}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
              summary.status === 'paid' || loading
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {summary.status === 'paid' ? 'Paid' : loading ? 'Redirecting...' : 'Process Payment'}
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
