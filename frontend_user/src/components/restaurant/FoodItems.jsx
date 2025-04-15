// src/components/restaurant/FoodItems.jsx
import { useState } from 'react';

export function FoodItems({ items, onAddToCart }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setSpecialInstructions("");
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      onAddToCart(selectedItem, quantity, specialInstructions || undefined);
      handleCloseDialog();
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs">
          <div className="relative h-40">
            <img 
              src={item.image || "/placeholder.svg"} 
              alt={item.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder.svg";
              }}
            />
            {item.popular && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </span>
            )}
          </div>
          <div className="p-3">
            <div className="flex justify-between items-center text-base">
              <h3 className="font-medium">{item.name}</h3>
              <span className="text-sm">${item.price.toFixed(2)}</span>
            </div>
            <p className="line-clamp-2 text-xs text-gray-600 mt-1">{item.description}</p>
            <div className="flex justify-between mt-3">
              <button 
                className="text-sm px-3 py-1 border border-gray-300 rounded-md flex items-center"
                onClick={() => handleOpenDialog(item)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>
                Details
              </button>
              <button 
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md flex items-center"
                onClick={() => onAddToCart(item, 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Order
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Item Details Dialog */}
      {showDialog && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
              <p className="text-sm text-gray-600">
                {selectedItem.category} • ${selectedItem.price.toFixed(2)}
              </p>
            </div>
            <div className="p-4 space-y-4">
              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-md"
                onError={(e) => {
                  e.target.src = "/placeholder.svg";
                }}
              />
              <p className="text-sm">{selectedItem.description}</p>
              <div className="space-y-2">
                <label htmlFor="special-instructions" className="text-sm font-medium block">
                  Special Instructions
                </label>
                <textarea
                  id="special-instructions"
                  placeholder="Any special requests or allergies?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Quantity</span>
                <div className="flex items-center gap-2">
                  <button 
                    className="w-8 h-8 flex items-center justify-center border rounded-md"
                    onClick={decrementQuantity} 
                    disabled={quantity <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button 
                    className="w-8 h-8 flex items-center justify-center border rounded-md"
                    onClick={incrementQuantity}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button 
                className="px-4 py-2 border rounded-md text-sm"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                onClick={handleAddToCart}
              >
                Order - ${(selectedItem.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}