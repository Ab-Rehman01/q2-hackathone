// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://bullet-mart.net.pk/wp-json/wc/v3/', // WooCommerce API base URL
//   auth: {
//     username: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || '', // Consumer Key
//     password: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || '', // Consumer Secret
//   },
// });

// export default api;


// utils/woocommerce.tsx
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://bullet-mart.net.pk/wp-json/wc/store/',
// });

// export const addToCart = async (productId: number, quantity: number = 1) => {
//   try {
//     const response = await api.post('cart/add-item', {
//       id: productId,
//       quantity: quantity,
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Add to Cart Error:', error);
//     throw new Error('Failed to add product to cart');
//   }
// };


// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
// import axios from "axios";

// WooCommerce REST API for Products, Orders, etc.
// const api = new WooCommerceRestApi({
//   url: process.env.NEXT_PUBLIC_WOO_COMMERCE_URL || "",
//   consumerKey: process.env.WOO_COMMERCE_CONSUMER_KEY || "",
//   consumerSecret: process.env.WOO_COMMERCE_CONSUMER_SECRET || "",
//   version: "wc/v3",
// });

//export default api;

// WooCommerce Store API for Cart Management
// const storeApi = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/store/`,
// });

// export const addToCart = async (productId: number, quantity: number = 1) => {
//   try {
//     const response = await storeApi.post("cart/add-item", {
//       id: productId,
//       quantity: quantity,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Add to Cart Error:", error);
//     throw new Error("Failed to add product to cart");
//   }
// };
// src/utils/woocommerce.ts
// import axios from "axios";

// // WooCommerce API Config
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_WOO_COMMERCE_URL + "/wp-json/wc/v3",
//   auth: {
//     username: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || "",
//     password: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || "",
//   },
// });

// // ✅ Function to get products
// export const getProducts = async () => {
//   try {
//     const response = await api.get("/products");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// };

// // ✅ Function to add product to cart
// export const addToCart = async (productId: number, quantity: number = 1) => {
//   try {
//     const response = await api.post("/cart/add", {
//       product_id: productId,
//       quantity: quantity,
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     throw new Error("Failed to add product to cart");
//   }
// };

// export default api;


import axios from "axios";

// WooCommerce API Config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WOO_COMMERCE_URL + "/wp-json/wc/v3",
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.WOO_COMMERCE_CONSUMER_KEY}:${process.env.WOO_COMMERCE_CONSUMER_SECRET}`
    ).toString("base64")}`,
  },
});

// ✅ Function to get products
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// ✅ Function to add product to cart
export const addToCart = async (productId: number, quantity: number = 1) => {
  try {
    const response = await api.post("/cart/add", {
      product_id: productId,
      quantity: quantity,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add product to cart");
  }
};

export default api;
