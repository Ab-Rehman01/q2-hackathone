// components/ProductCard.js
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add to cart.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={addToCart} disabled={loading}>
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
