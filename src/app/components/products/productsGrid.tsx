// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useCart } from '../../context/CartContext';  // Importing the CartContext hook
// import '../../globals.css';

// const ProductsGrid = () => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [cartMessage, setCartMessage] = useState<string | null>(null); // For feedback messages

//   useEffect(() => {
//     fetch('https://bullet-mart.net.pk/wp-json/wp/v2/product?_embed')
//       .then((response) => response.json())
//       .then((data: Product[]) => {
//         setProducts(data);
//       })
//       .catch((error) => console.error('پراڈکٹس لوڈ کرنے میں مسئلہ:', error));
//   }, []);

//   const removeHtmlTags = (html: string): string => {
//     return html.replace(/<\/?[^>]+(>|$)/g, '');
//   };

//   const addToCart = async (productId: number) => {
//     try {
//       const response = await fetch('https://bullet-mart.net.pk/wp-json/wc/store/cart/items', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           id: productId, // WooCommerce product ID
//           quantity: 1, // Default quantity
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setCartMessage('پراڈکٹ کامیابی سے کارٹ میں شامل کر دی گئی ہے!');
//         console.log('Cart Response:', data); // For debugging
//       } else {
//         setCartMessage('کارٹ میں پراڈکٹ شامل کرنے میں مسئلہ ہوا۔');
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       setCartMessage('کارٹ میں پراڈکٹ شامل کرنے میں مسئلہ ہوا۔');
//     }
//   };

//   return (
//     <div className="products-page">
//       <h1>تمام پراڈکٹس</h1>
//       {cartMessage && <p className="cart-message">{cartMessage}</p>} {/* Feedback Message */}
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <h2>{product.title.rendered}</h2>
//             <img
//               src={
//                 product._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
//                 'https://via.placeholder.com/150'
//               }
//               alt={product.title.rendered}
//             />
//             <p>{removeHtmlTags(product.excerpt.rendered)}</p>
//             <p>قیمت: {product.price || 'موجود نہیں'}</p> {/* Show product price */}
//             <Link href={`/products/${product.id}`}>مزید پڑھیں</Link>
//             {/* Add to Cart Button */}
//             <button onClick={() => addToCart(product.id)} className="add-to-cart-btn">
//               کارٹ میں شامل کریں
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsGrid;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';

// const ProductsGrid = () => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           'https://bullet-mart.net.pk/wp-json/wp/v2/product?_embed'
//         );
//         if (!response.ok) {
//           throw new Error('Failed to fetch products');
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError('پراڈکٹس لوڈ کرنے میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔');
//         console.error('Error fetching products:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const removeHtmlTags = (html: string): string => {
//     return html.replace(/<\/?[^>]+(>|$)/g, '');
//   };

//   if (loading) {
//     return <p>...loading</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="products-page">
//       <h2 className="">All Products</h2>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <h2>{product.title?.rendered || 'title not available'}</h2>
//             <img
//               src={
//                 product._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
//                 'https://via.placeholder.com/150'
//               }
//               alt={product.title?.rendered || 'product image'}
//               className="product-image"
//             />
//             <p className="product-description">
//               {removeHtmlTags(product.excerpt?.rendered || '').slice(0, 100)}...
//             </p>
//             <p>Price: {product.price || 'product not available'}</p>
//             <Link href={`/products/${product.id}`} className="details-link">
//               more detail
//             </Link>
//             <button
//               onClick={() => alert(`Product ID: ${product.id} added to cart!`)}
//               className="add-to-cart-btn"
//             >
//               Add to Cart            </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsGrid;


// Updated ProductsGrid Component
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import api from '@/utils/woocommerce'; // Import the WooCommerce API instance
// import { useCart } from '../context/CartContext'; // Import CartContext

// const ProductsGrid = () => {
//   const [products, setProducts] = useState<any[]>([]); // Product list
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const { addToCart } = useCart(); // Use CartContext

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('products'); // Fetch products from WooCommerce
//         setProducts(response.data); // Set the product data
//       } catch (err) {
//         setError('پراڈکٹس لوڈ کرنے میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔');
//         console.error('Error fetching products:', err);
//       } finally {
//         setLoading(false); // End loading
//       }
//     };

//     fetchProducts();
//   }, []);

//   const removeHtmlTags = (html: string): string => {
//     return html.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags from text
//   };

//   const handleAddToCart = async (productId: number) => {
//     try {
//       addToCart({ id:productId.toString(), quantity: 1 }); // Add to cart using context
//       alert('Product successfully added to the cart!');
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       alert('Failed to add product to cart.');
//     }
//   };

//   if (loading) {
//     return <p>...loading</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="products-page">
//       <h2>All Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="product-card border rounded-lg p-4 shadow-md">
//             <h2 className="font-semibold text-lg">{product.name}</h2>
//             <img
//               src={product.images?.[0]?.src || 'https://via.placeholder.com/150'}
//               alt={product.name || 'Product Image'}
//               className="product-image w-full h-48 object-cover rounded-md"
//             />
//             <p className="product-description text-sm text-gray-500">
//               {removeHtmlTags(product.description || '').slice(0, 100)}...
//             </p>
//             <div className="product-prices mt-2">
//               {product.sale_price ? (
//                 <>
//                   <p className="text-red-500 font-semibold">
//                     Sale Price: Rs. {product.sale_price}
//                   </p>
//                   <p className="text-gray-500 line-through">
//                     Regular Price: Rs. {product.regular_price}
//                   </p>
//                 </>
//               ) : (
//                 <p className="font-semibold">Price: Rs. {product.regular_price}</p>
//               )}
//             </div>
//             <Link
//               href={`/products/${product.id}`}
//               className="text-blue-600 underline mt-2 block"
//             >
//               More Detail
//             </Link>
//             <button
//               onClick={() => handleAddToCart(product.id)}
//               className="add-to-cart-btn mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsGrid;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import api from '@/utils/woocommerce'; // WooCommerce API instance

// const ProductsGrid = () => {
//   const [products, setProducts] = useState<any[]>([]); // Product list
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState<string | null>(null); // Error state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await api.get('products'); // Fetch WooCommerce products
//         setProducts(response.data);
//       } catch (err) {
//         setError('پراڈکٹس لوڈ کرنے میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔');
//         console.error('Error fetching products:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const removeHtmlTags = (html: string): string => {
//     return html.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags from text
//   };
//   const handleAddToCart = async (productId: number) => {
//     try {
//       const response = await fetch('/?wc-ajax=add_to_cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `product_id=${productId}&quantity=1`,
//         credentials: 'include', // WooCommerce Cart کو Session-based رکھنے کے لیے
//       });
  
//       const result = await response.json();
  
//       if (result && result.error) {
//         throw new Error(result.error);
//       }
  
//       alert('✅ Product successfully added to cart!');
//     } catch (error) {
//       console.error('🚨 Error adding product to cart:', error);
//       alert('❌ Failed to add product to cart.');
//     }
//   };
  // const handleAddToCart = async (productId: number) => {
  //   try {
  //     const response = await api.post('cart/add-item', {
  //       id: productId,
  //       quantity: 1,
  //     });

  //     if (response.status === 200) {
  //       alert('Product successfully added to the cart!');
  //     }
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //     alert('Failed to add product to cart.');
  //   }
  // };

//   if (loading) {
//     return <p>...loading</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="products-page">
//       <h2>All Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="product-card border rounded-lg p-4 shadow-md">
//             <h2 className="font-semibold text-lg">{product.name}</h2>
//             <img
//               src={product.images?.[0]?.src || 'https://via.placeholder.com/150'}
//               alt={product.name || 'Product Image'}
//               className="product-image w-full h-48 object-cover rounded-md"
//             />
//             <p className="product-description text-sm text-gray-500">
//               {removeHtmlTags(product.description || '').slice(0, 100)}...
//             </p>
//             <div className="product-prices mt-2">
//               {product.sale_price ? (
//                 <>
//                   <p className="text-red-500 font-semibold">
//                     Sale Price: Rs. {product.sale_price}
//                   </p>
//                   <p className="text-gray-500 line-through">
//                     Regular Price: Rs. {product.regular_price}
//                   </p>
//                 </>
//               ) : (
//                 <p className="font-semibold">Price: Rs. {product.regular_price}</p>
//               )}
//             </div>
//             <Link
//               href={`/products/${product.id}`}
//               className="text-blue-600 underline mt-2 block"
//             >
//               More Detail
//             </Link>
//             <button
//               onClick={() => handleAddToCart(product.id)}
//               className="add-to-cart-btn mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsGrid;
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/utils/woocommerce';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description?: string;
  sale_price?: string;
  regular_price: string;
  images?: { id: number; src: string; alt?: string }[];
}

const ProductsGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Problem .... Try again');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 text-lg">{error}</p>;

  const handleAddToCart = async (productId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/cart/add-item`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productId, quantity: 1 }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert('Product added to cart successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
          >
            {/* Product Image */}
            <div className="relative">
              {product.images?.length ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || 'Product Image'}
                  width={400}
                  height={400}
                  className="w-full h-60 object-cover"
                />
              ) : (
                <Image
                  src="https://via.placeholder.com/150"
                  alt="Placeholder Image"
                  width={400}
                  height={400}
                  className="w-full h-60 object-cover"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 min-h-[48px]">
                {product.name}
              </h2>

              {/* <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
                {product.description
                  ? product.description.slice(0, 80) + '...'
                  : 'کوئی تفصیل دستیاب نہیں'}
              </p> */}

{/* Product Description */}
<p
  className="text-sm text-gray-500 mt-1 min-h-[60px] line-clamp-3"
  dangerouslySetInnerHTML={{ __html: product.description || 'No Detail' }}
></p>


              <div className="mt-3 flex justify-between items-center">
                {product.sale_price ? (
                  <>
                    <p className="text-red-600 font-semibold">
                      Rs. {product.sale_price}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      Rs. {product.regular_price}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-700 font-semibold">
                    Rs. {product.regular_price}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-auto flex gap-3">
                <Link
                  href={`/products/${product.id}`}
                  className="flex-1 text-center bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition"
                >
                  More Detail
                </Link>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="flex-1 bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Button */}
      <div className="text-center mt-8">
        <Link href="/cart">
          <button className="bg-gray-800 text-white py-3 px-6 rounded-lg text-lg hover:bg-gray-900 transition">
            🛒 Check in Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsGrid;
