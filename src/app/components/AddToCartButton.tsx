"use client";

import { addToCart } from "@/utils/woocommerce";
import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: number }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(productId);
      alert("Product added to cart successfully!");
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
