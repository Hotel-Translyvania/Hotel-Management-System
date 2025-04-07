import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { FoodCategories } from '../../components/restaurant/FoodCategories';
import { FoodItems } from '../../components/restaurant/FoodItems';
import { Cart } from '../../components/restaurant/Cart';
import { OrderConfirmation } from '../../components/restaurant/OrderConfirmation';
import { foodItems, categories } from '../../data/foodItems';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  // Filter food items based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : selectedCategory === "Popular"
        ? foodItems.filter((item) => item.popular)
        : foodItems.filter((item) => item.category === selectedCategory);

  // Add item to cart
  const addToCart = (item, quantity = 1, specialInstructions) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.foodItem.id === item.id && cartItem.specialInstructions === specialInstructions,
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists with same instructions
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          id: Date.now(),
          foodItem: item,
          quantity,
          specialInstructions,
        },
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (cartItemId) => {
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems(cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)));
  };

  // Calculate total price of items in cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.foodItem.price * item.quantity, 0);
  };

  // Place order
  const placeOrder = () => {
    // In a real app, this would send the order to a backend
    const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
    setShowOrderConfirmation(true);
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Close order confirmation
  const closeOrderConfirmation = () => {
    setShowOrderConfirmation(false);
    setOrderNumber(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        cartItemCount={cartItems.reduce((count, item) => count + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Menu</h1>

        <FoodCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FoodItems items={filteredItems} onAddToCart={addToCart} />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
        total={calculateTotal()}
        onCheckout={placeOrder}
      />

      <OrderConfirmation 
        isOpen={showOrderConfirmation} 
        onClose={closeOrderConfirmation} 
        orderNumber={orderNumber} 
      />
    </div>
  );
}