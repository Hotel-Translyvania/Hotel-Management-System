
import { useState } from 'react';
import { ChargeItem, ServiceType } from '../../data/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ItemizedChargesProps {
  charges: ChargeItem[];
}

type CategoryFilter = ServiceType | 'all';

const ItemizedCharges = ({ charges }: ItemizedChargesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredCharges = selectedCategory === 'all' 
    ? charges 
    : charges.filter(charge => charge.category === selectedCategory);

  const getCategoryTotal = (category: CategoryFilter) => {
    const filtered = category === 'all' 
      ? charges 
      : charges.filter(charge => charge.category === category);
    
    return filtered.reduce((total, charge) => total + charge.amount + charge.tax, 0);
  };

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'All Charges', value: 'all' },
    { label: 'Room', value: 'room' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Spa', value: 'spa' },
    { label: 'Event', value: 'event' },
    { label: 'Other', value: 'other' }
  ];

  // Only show categories that have charges
  const availableCategories = categories.filter(cat => 
    cat.value === 'all' || charges.some(charge => charge.category === cat.value)
  );

  return (
    <div className="section-card">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h2 className="text-xl font-semibold text-gray-800">Itemized Charges</h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      <div className={`mt-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          {availableCategories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} {category.value !== 'all' && `(${formatCurrency(getCategoryTotal(category.value))})`}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCharges.map((charge) => (
                <tr key={charge.id} className="table-row-hover">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {charge.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {charge.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {charge.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                    {formatCurrency(charge.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {formatCurrency(charge.tax)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(charge.amount + charge.tax)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={5} className="px-6 py-3 text-sm font-medium text-gray-900 text-right">
                  Subtotal:
                </td>
                <td className="px-6 py-3 text-sm font-bold text-blue-600 text-right">
                  {formatCurrency(
                    filteredCharges.reduce((sum, charge) => sum + charge.amount + charge.tax, 0)
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemizedCharges;