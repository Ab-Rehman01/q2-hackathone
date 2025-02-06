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
// }"use client";

"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Fetch product data
async function fetchProductData(id: string) {
  const res = await fetch(`https://bullet-mart.net.pk/wp-json/wp/v2/product/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  return res.json();
}

// Fetch media data (for product image)
async function fetchMediaData(mediaId: number) {
  const res = await fetch(`https://bullet-mart.net.pk/wp-json/wp/v2/media/${mediaId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch media data');
  }
  return res.json();
}

export default function ProductPage() {
  const { id } = useParams(); // Dynamic ID from URL
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch product data
      fetchProductData(id)
        .then((data) => {
          setProduct(data);

          // Fetch image if featured_media exists
          if (data.featured_media) {
            return fetchMediaData(data.featured_media);
          }
          return null;
        })
        .then((mediaData) => {
          if (mediaData) {
            setImage(mediaData.source_url);
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: product.content.rendered }} />
      {image ? (
        <img src={image} alt={product.title.rendered} />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
}
