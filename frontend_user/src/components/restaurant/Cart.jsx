export function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, total, onCheckout }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="bg-white w-full max-w-md h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <h2 className="text-lg font-semibold">Your Orders</h2>
            </div>
            <button onClick={onClose} className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
  
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-gray-400">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mt-1">Add some delicious items from our menu to get started.</p>
              <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md" onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.foodItem.image || "/placeholder.svg"}
                        alt={item.foodItem.name}
                        className="h-16 w-16 rounded-md object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.foodItem.name}</h4>
                          <button className="h-6 w-6 text-gray-500" onClick={() => onRemoveItem(item.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">${item.foodItem.price.toFixed(2)}</div>
                        {item.specialInstructions && (
                          <div className="text-xs text-gray-500 italic">"{item.specialInstructions}"</div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              className="h-6 w-6 flex items-center justify-center border rounded-md"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              className="h-6 w-6 flex items-center justify-center border rounded-md"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </button>
                          </div>
                          <div className="font-medium">${(item.foodItem.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="p-4 border-t space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (10%)</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>
  
                <button 
                  className="w-full py-2 bg-blue-600 text-white rounded-md"
                  onClick={onCheckout}
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }