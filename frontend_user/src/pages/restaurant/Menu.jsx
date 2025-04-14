import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { RestaurantNavbar } from '@/components/restaurant/RestaurantNavbar';
import { FoodCategories } from '../../components/restaurant/FoodCategories';
import { FoodItems } from '../../components/restaurant/FoodItems';
import { Cart } from '../../components/restaurant/Cart';
import { OrderConfirmation } from '../../components/restaurant/OrderConfirmation';
// import { categories } from '../../data/foodItems';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:3000/api/v1/hotels/1/menu', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }

        const data = await response.json();
        setFoodItems(data);
        setCategories(["All", "Popular", ...Array.from(new Set(data.map((item) => item.category)))]);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching menu items:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? foodItems
      : selectedCategory === "Popular"
        ? foodItems.filter((item) => item.popular)
        : foodItems.filter((item) => item.category === selectedCategory);

  const addToCart = (item, quantity = 1, specialInstructions) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.foodItem.id === item.id && cartItem.specialInstructions === specialInstructions,
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
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
  const orderData = (data) => {
    
  };
  const removeFromCart = (cartItemId) => {
    setCartItems(cartItems.filter((item) => item.id !== cartItemId));
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item)));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.foodItem.price * item.quantity, 0);
  };

  const placeOrder = () => {
    const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
    setShowOrderConfirmation(true);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const closeOrderConfirmation = () => {
    setShowOrderConfirmation(false);
    setOrderNumber(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 mt-32 flex justify-center items-center">
          <div className="text-xl">Loading menu...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8 mt-32 flex justify-center items-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Common Navbar */}
      <Navbar />
      
      {/* Restaurant-Specific Navbar */}
      <RestaurantNavbar
        cartItemCount={cartItems.reduce((count, item) => count + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 mt-32">
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
        boookingId={orderNumber}
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