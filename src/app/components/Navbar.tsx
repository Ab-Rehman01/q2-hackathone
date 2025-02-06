// 'use client';

// import React, { useState, useEffect } from 'react';

// const Navbar = () => {
//   const [cartCount, setCartCount] = useState(0);

//   // Fetch cart count on initial load
//   useEffect(() => {
//     const fetchCartCount = async () => {
//       try {
//         const response = await fetch(
//           'https://bullet-mart.net.pk/wp-json/wc/store/cart',
//           {
//             credentials: 'include', // Include cookies for session
//           }
//         );

//         if (response.ok) {
//           const cart = await response.json();
//           setCartCount(cart.items_count || 0); // Update cart count
//         }
//       } catch (error) {
//         console.error('Error fetching cart count:', error);
//       }
//     };

//     fetchCartCount();
//   }, []); // Run only once on component mount

//   return (
//     <nav className="navbar">
//       <h1>Bullet Mart</h1>
//       <div className="cart-icon">
//       <a href="/cart">
//   🛒 Cart <span className="cart-count">({cartCount})</span>
// </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



//'use client';

//import React from 'react';
//import { useCart } from './context/CartContext';

// const Navbar = () => {
//   const { cartCount } = useCart();

//   return (
//     <nav className="navbar">
//       <h1>Bullet Mart</h1>
//       <div className="cart-icon">
//         <a href="/cart">
//           🛒 Cart <span className="cart-count">({cartCount})</span>
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// export default Navbar;
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("https://bullet-mart.net.pk/wp-json/wc/store/cart");
        setCartCount(response.data.items.length);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  return (
    <nav className="navbar">
      <h1>Bullet Mart</h1>
      <div className="cart-icon">
        <a href="/cart">🛒 Cart <span>({cartCount})</span></a>
      </div>
    </nav>
  );
};

export default Navbar;

