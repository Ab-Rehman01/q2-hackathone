// import React, { createContext, useContext, useState } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number; // Quantity of each item
// }

// interface CartContextType {
//   cart: CartItem[];
//   cartCount: number; // Add cartCount to the context type
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Calculate cartCount (total number of items in the cart)
//   const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

//   const addToCart = (item: CartItem) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

//       if (existingItem) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
//             : cartItem
//         );
//       } else {
//         return [...prevCart, item];
//       }
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };




"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  key: string;
  id: number;
  name: string;
  quantity: number;
  totals: {
    line_total: string;
    line_subtotal: string;
  };
};

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const response = await fetch("https://bullet-mart.net.pk/wp-json/wc/store/cart/items");
      if (!response.ok) throw new Error("Failed to fetch cart data");
      const data: CartItem[] = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
