
import { useState } from 'react';
import { BillingSummary as BillingSummaryType } from '../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BillingSummaryProps {
  summary: BillingSummaryType;
  onUpdateSummary: (summary: BillingSummaryType) => void;
}

const BillingSummary = ({ summary, onUpdateSummary }: BillingSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="section-card">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-semibold text-gray-800">Billing Summary</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      <div className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-20'}`}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Subtotal</span>
            </div>
            <span className="text-sm text-gray-800">{formatCurrency(summary.subtotal)}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Tax</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3 h-3 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white p-2 shadow-md rounded-md text-xs border border-gray-200 max-w-xs text-center">
                    <p>Includes state tax (6%) and local occupancy tax (4%)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm text-gray-800">{formatCurrency(summary.tax)}</span>
          </div>

          {summary.serviceCharge && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">Service Charge</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3 h-3 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white p-2 shadow-md rounded-md text-xs border border-gray-200 max-w-xs text-center">
                      <p>5% service charge applied to all services</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-gray-800">{formatCurrency(summary.serviceCharge)}</span>
            </div>
          )}

          {summary.discount && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">Discount</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-3 h-3 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white p-2 shadow-md rounded-md text-xs border border-gray-200 max-w-xs text-center">
                      <p>Premium guest loyalty discount</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-green-600">-{formatCurrency(summary.discount)}</span>
            </div>
          )}

          <div className="pt-2 mt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">Total Amount</span>
              <span className="font-bold text-xl text-blue-600">{formatCurrency(summary.total)}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 mt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <span className={`ml-2 status-badge ${
            summary.status === 'paid' 
              ? 'status-badge-paid' 
              : summary.status === 'pending' 
                ? 'status-badge-pending' 
                : 'status-badge-partial'
          }`}>
            {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BillingSummary;