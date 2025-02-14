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
        const data = await response.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.error(err); // Log it instead of leaving it unused
      }
       finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (itemKey: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart/remove-item/${itemKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      setCartItems(cartItems.filter((item) => item.key !== itemKey));
    } catch (err) {
      alert('Failed to remove item.');
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.key} className="border-b py-2 flex justify-between items-center">
              <span>{item.name} (x{item.quantity})</span>
              <span className="font-bold">Rs. {item.total_price}</span>
              <button
                onClick={() => handleRemoveItem(item.key)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Checkout
        </button>
      )}
    </div>
  );
}
