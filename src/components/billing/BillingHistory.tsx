
import { useState } from 'react';
import { BillingHistory as BillingHistoryType, ChargeItem } from '../../data/mockData';
import { ChevronDown, ChevronUp, Search, Calendar, Filter } from 'lucide-react';

interface BillingHistoryProps {
  history: BillingHistoryType[];
  currentInvoiceId: string;
}

const BillingHistory = ({ history, currentInvoiceId }: BillingHistoryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleInvoiceExpand = (invoiceId: string) => {
    setExpandedInvoice(expandedInvoice === invoiceId ? null : invoiceId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredHistory = history.filter(invoice => 
    invoice.id !== currentInvoiceId && // Don't show current invoice in history
    (searchTerm === '' || 
     invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     invoice.date.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="section-card">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-semibold text-gray-800">Billing History</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      <div className={`mt-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px]' : 'max-h-0'}`}>
        {filteredHistory.length > 0 ? (
          <>
            <div className="mb-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors duration-200"
                placeholder="Search by invoice ID or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHistory.map((invoice) => (
                    <>
                      <tr 
                        key={invoice.id} 
                        className="table-row-hover"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {invoice.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          {formatCurrency(invoice.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className={`status-badge ${
                            invoice.status === 'paid' 
                              ? 'status-badge-paid' 
                              : invoice.status === 'pending' 
                                ? 'status-badge-pending' 
                                : 'status-badge-partial'
                          }`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          <button
                            onClick={() => toggleInvoiceExpand(invoice.id)}
                            className="text-blue-600 hover:text-blue-800 focus:outline-none"
                          >
                            {expandedInvoice === invoice.id ? 'Hide' : 'View'}
                          </button>
                        </td>
                      </tr>
                      {expandedInvoice === invoice.id && (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 bg-gray-50">
                            <div className="animate-fade-in">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Invoice Details</h4>
                              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-sm">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Description</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Amount</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Tax</th>
                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {invoice.items.map((item: ChargeItem) => (
                                    <tr key={item.id}>
                                      <td className="px-4 py-2 text-gray-800">{item.description}</td>
                                      <td className="px-4 py-2 text-gray-500 capitalize">{item.category}</td>
                                      <td className="px-4 py-2 text-gray-800 text-right">{formatCurrency(item.amount)}</td>
                                      <td className="px-4 py-2 text-gray-500 text-right">{formatCurrency(item.tax)}</td>
                                      <td className="px-4 py-2 text-gray-900 text-right font-medium">{formatCurrency(item.amount + item.tax)}</td>
                                    </tr>
                                  ))}
                                  <tr className="bg-gray-50">
                                    <td colSpan={4} className="px-4 py-2 text-gray-900 text-right font-medium">Total:</td>
                                    <td className="px-4 py-2 text-blue-600 text-right font-bold">{formatCurrency(invoice.total)}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No previous billing history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingHistory;