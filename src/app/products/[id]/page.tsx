"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: { src: string }[];
}

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        console.log("Product Data:", data);
        setProduct(data);
        setSelectedImage(data.images?.[0]?.src || "/default-image.jpg");
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Add to Cart Functionality
  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add to cart");

      alert("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading product...</p>;

  if (error)
    return <p className="text-center text-red-500 text-lg">{error}</p>;

  if (!product)
    return <p className="text-center text-gray-500 text-lg">No product found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full max-w-lg overflow-hidden rounded-lg shadow-md border">
            <Image
              src={selectedImage || "/default-image.jpg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
              priority
            />
          </div>

          <div className="flex gap-3 mt-4">
            {product.images.map((img, index) => (
              <Image
                key={index}
                src={img.src}
                alt={`Product image ${index + 1}`}
                width={80}
                height={80}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === img.src ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img.src)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl font-semibold text-green-600 mt-2">
            Price: {product.price} PKR
          </p>

          <div
            className="text-gray-600 mt-4 text-lg"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Action Buttons */}
          <div className="mt-6 flex gap-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition text-lg"
            >
              Add to Cart
            </button>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700 transition text-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
