export function OrderConfirmation({ isOpen, onClose, orderNumber }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your order has been received and is being prepared.
            </p>
  
            <div className="rounded-lg border p-4 text-center mb-6">
              <div className="text-sm text-gray-500">Order Number</div>
              <div className="text-2xl font-bold">{orderNumber}</div>
            </div>
  
            <div className="space-y-2 mb-6">
              <h4 className="font-medium flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Estimated Preparation Time
              </h4>
              <p className="text-sm text-gray-600">
                Your order will be ready in approximately 25-30 minutes. You can pick it up at the restaurant or we'll
                deliver it to your room.
              </p>
            </div>
  
            <div className="rounded-lg bg-gray-100 p-4 mb-6">
              <h4 className="font-medium mb-2">Order Status</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="text-sm">Order received</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-gray-500 animate-pulse"></span>
                  </div>
                  <div className="text-sm">Preparing your food</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-500">3</span>
                  </div>
                  <div className="text-sm">Ready for pickup/delivery</div>
                </div>
              </div>
            </div>
  
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md w-full"
              onClick={onClose}
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }