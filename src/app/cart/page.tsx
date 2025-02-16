'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  key: string;
  id: number;
  name: string;
  quantity: number;
  total_price: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      console.log('API URL:', process.env.NEXT_PUBLIC_WOO_COMMERCE_URL); // ✅ Debug API URL
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart`);
        const data = await response.json();
        console.log('Cart API Response:', data); // ✅ Debug Cart Response
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemKey: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart/items/${itemKey}?_method=DELETE`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to remove item');

      setCartItems((prevItems) => prevItems.filter((item) => item.key !== itemKey));
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  if (loading) return <p className="text-center">Loading cart...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.key} className="border-b py-2 flex justify-between items-center">
              <span>{item.name} (x{item.quantity})</span>
              <span className="font-bold">Rs. {item.total_price}</span>
              <button
                onClick={() => handleRemoveItem(item.key)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      )}
    </div>
  );
}
