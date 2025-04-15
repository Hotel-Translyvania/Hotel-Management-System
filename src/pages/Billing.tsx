function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import GuestInfoCard from '@/components/billing/GuestInfoCard';
import BillingSummary from '@/components/billing/BillingSummary';
import PaymentSection from '@/components/billing/PaymentSection';
import ItemizedCharges from '@/components/billing/ItemizedCharges';
import BillingHistory from '@/components/billing/BillingHistory';
import ServiceSelector from '@/components/billing/ServiceSelector';
import { mockBillingData, updateServiceDetails, BillingData, ServiceType } from '@/data/mockData';
import "../index.css";

const Billing = () => {
  const [billingData, setBillingData] = useState<BillingData>(mockBillingData);

  const handleServiceTypeChange = (type: ServiceType) => {
    const updatedService = updateServiceDetails(type);
    
    setBillingData({
      ...billingData,
      service: updatedService
    });
  };

  const handleUpdateSummary = (summary: typeof billingData.summary) => {
    setBillingData({
      ...billingData,
      summary
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Billing Statement</h1>
          <p className="text-gray-600">Invoice #{billingData.id}</p>
        </div>

        <ServiceSelector 
          currentType={billingData.service.type} 
          onServiceChange={handleServiceTypeChange} 
        />
        
        <GuestInfoCard 
          guest={billingData.guest} 
          service={billingData.service} 
        />
        
        <div className="md:flex md:space-x-6">
          <div className="md:w-2/3">
            <ItemizedCharges 
              charges={billingData.charges} 
            />
            
            <BillingHistory 
              history={billingData.history}
              currentInvoiceId={billingData.id}
            />
          </div>
          
          <div className="md:w-1/3 space-y-6">
            <BillingSummary 
              summary={billingData.summary} 
              onUpdateSummary={handleUpdateSummary}
            />
            
            <PaymentSection 
              summary={billingData.summary}
              onUpdateSummary={handleUpdateSummary}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © 2023 Premium Hotel. All rights reserved.
            </div>
            <div className="mt-2 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Billing;