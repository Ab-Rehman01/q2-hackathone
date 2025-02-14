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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart`);
        if (!response.ok) throw new Error('Failed to fetch cart');
        
        const data = await response.json();
        setCartItems(data.items || []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (itemKey: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart/remove-item/${itemKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to remove item');

      setCartItems((prevItems) => prevItems.filter((item) => item.key !== itemKey));
    } catch (error) {
      setError('Failed to remove item. Please try again.');
    }
  };

  if (loading) return <p className="text-center">Loading cart...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

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
