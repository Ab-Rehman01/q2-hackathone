// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   description: string;
//   images: { src: string }[];
// }

// export default function ProductPage() {
//   const params = useParams();
//   const id = params?.id as string;
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) {
//       setError("Invalid Product ID");
//       setLoading(false);
//       return;
//     }

//     const fetchProduct = async () => {
//       try {
//         console.log("Fetching product with ID:", id);
//         const response = await fetch(`/api/products/${id}`);

//         if (!response.ok) throw new Error("Failed to fetch product");

//         const data = await response.json();
//         console.log("Product Data:", data);
//         setProduct(data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load product.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center text-gray-500">Loading product...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;
//   if (!product) return <p className="text-center text-gray-500">No product found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Product Image */}
//         <div className="flex justify-center">
//           <img
//             src={product.images?.[0]?.src || "https://www.bullet-mart.net.pk/default-image.jpg"}
//             alt={product.name}
//             className="w-full max-w-xs md:max-w-md rounded-lg shadow"
//           />
//         </div>

//         {/* Product Details */}
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
//           <p className="text-lg font-semibold text-green-600 mt-2">Price: {product.price} PKR</p>

//           {/* Correctly Render HTML Description */}
//           <div className="text-gray-600 mt-4" dangerouslySetInnerHTML={{ __html: product.description }} />

//           {/* Action Buttons */}
//           <div className="mt-6 flex gap-4">
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
//               Add to Cart
//             </button>
//             <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
          {/* Main Image */}
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

          {/* Thumbnails */}
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

          {/* Product Description */}
          <div
            className="text-gray-600 mt-4 text-lg"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          {/* Action Buttons */}
          <div className="mt-6 flex gap-6">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition text-lg">
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
