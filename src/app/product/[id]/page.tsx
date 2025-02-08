//import { Metadata } from 'next';
//import {ProductDetail}  from '../../components/products/Product_Detail';
//import { products } from '@/lib/products';
//import { notFound } from 'next/navigation';
// import { ProductReviews } from '../../components/productreview/ProductReview';
// import RelatedProducts from '@/components/products/related-products';

//type ProductPageProps = {
  //params: { id: string }; // Define `params` explicitly
  //searchParams?: { [key: string]: string | string[] | undefined };
//};

// Handle dynamic metadata generation
//export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  //const product = products.find((p) => p.id === params.id);

  //if (!product) {
   // return {
     // title: 'Product Not Found',
      //description: 'The product you are looking for does not exist.',
    //};
  //}

//   return {
//     title: `${product.title} - Shop.co`,
//     description: product.description,
//   };
// }

// export default function ProductPage({ params }: ProductPageProps) {
//   const product = products.find((p) => p.id === params.id);

//   if (!product) {
//    notFound(); // Built-in Next.js error page
  //}

//   return (
//     <div>
//       <ProductDetail product={product} />
//       {/* <ProductReviews /> */}
//       {/* <RelatedProducts /> */}
//     </div>
//   );
// }

// "use client";

// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// // Define types for product and media
// interface Product {
//   title: { rendered: string };
//   content: { rendered: string };
//   featured_media: number | null;
// }

// interface Media {
//   source_url: string;
// }

// // Fetch product data
// async function fetchProductData(id: string): Promise<Product> {
//   const res = await fetch(`https://bullet-mart.net.pk/wp-json/wp/v2/product/${id}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch product data');
//   }
//   return res.json();
// }

// // Fetch media data (for product image)
// async function fetchMediaData(mediaId: number): Promise<Media> {
//   const res = await fetch(`https://bullet-mart.net.pk/wp-json/wp/v2/media/${mediaId}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch media data');
//   }
//   return res.json();
// }

// export default function ProductPage() {
//   const { id } = useParams(); // Dynamic ID from URL
//   const [product, setProduct] = useState<Product | null>(null);
//   const [image, setImage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (id) {
//       // Fetch product data
//       fetchProductData(id)
//         .then((data) => {
//           setProduct(data);

//           // Fetch image if featured_media exists
//           if (data.featured_media) {
//             return fetchMediaData(data.featured_media);
//           }
//           return null;
//         })
//         .then((mediaData) => {
//           if (mediaData) {
//             setImage(mediaData.source_url);
//           }
//         })
//         .catch((err) => setError(err.message));
//     }
//   }, [id]);

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   if (!product) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {/* Product Image */}
//         {image ? (
//           <div className="mb-6">
//             <img
//               src={image}
//               alt={product.title.rendered}
//               className="w-full h-auto rounded-lg object-cover"
//             />
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center">No image available</p>
//         )}

//         {/* Product Title */}
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">
//           {product.title.rendered}
//         </h1>

//         {/* Product Description */}
//         <div
//           className="text-gray-600 leading-relaxed mb-6"
//           dangerouslySetInnerHTML={{ __html: product.content.rendered }}
//         />

//         {/* Add to Cart Button */}
//         <div className="flex justify-between items-center">
//           <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition">
//             Add to Cart
//           </button>
//           <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { notFound } from "next/navigation";
// import Image from "next/image";

// // ✅ API se product data fetch karne ka function
// async function getProduct(id: string) {
//   const res = await fetch(
//     `https://bullet-mart.net.pk/wp-json/wp/v2/product/${id}?_embed`
//   );

//   if (!res.ok) {
//     return notFound();
//   }

//   return res.json();
// }

// // ✅ Single Product Page Component
// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const product = await getProduct(params.id);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Product Title */}
//       <h1 className="text-2xl font-bold mb-4">{product.title.rendered}</h1>

//       {/* Product Image */}
//       <div className="flex justify-center mb-4">
//         {product?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
//           <Image
//             src={product._embedded["wp:featuredmedia"][0].source_url}
//             alt={product.title.rendered}
//             width={500}
//             height={500}
//             className="rounded-lg shadow-lg"
//           />
//         ) : (
//           <p className="text-gray-500">No image available</p>
//         )}
//       </div>

//       {/* Product Description */}
//       <div
//         className="text-gray-700"
//         dangerouslySetInnerHTML={{ __html: product.content.rendered }}
//       />

//       {/* Add to Cart Button */}
//       <button
//         className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }
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

