"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: [{ source_url: string }];
  };
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(
    `https://bullet-mart.net.pk/wp-json/wp/v2/product/${id}?_embed`
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProduct(params.id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // ✅ error اب استعمال ہو رہا ہے
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <p className="text-blue-500">Loading product...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>; // ✅ error اب استعمال ہو رہا ہے

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product?.title.rendered}</h1>

      <div className="flex justify-center mb-4">
        {product?._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <Image
            src={product._embedded["wp:featuredmedia"][0].source_url}
            alt={product.title.rendered}
            width={400}
            height={400}
            className="rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
