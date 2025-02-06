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
// import { useState, useEffect } from "react";
// import axios from "axios";

// const Navbar = () => {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.get("https://bullet-mart.net.pk/wp-json/wc/store/cart");
//         setCartCount(response.data.items.length);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       }
//     };
//     fetchCart();
//   }, []);

//   return (
//     <nav className="navbar">
//       <h1>Bullet Mart</h1>
//       <div className="cart-icon">
//         <a href="/cart">🛒 Cart <span>({cartCount})</span></a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Menu, Search, ShoppingCart, User } from 'lucide-react'
import { integralCF } from '@/app/ui/fonts'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)

  // ✅ Fetch cart count from WooCommerce API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          'https://bullet-mart.net.pk/wp-json/wc/store/cart'
        )
        setCartCount(response.data.items.length)
      } catch (error) {
        console.error('Error fetching cart:', error)
      }
    }
    fetchCart()
  }, [])

  return (
    <div className="w-full bg-white shadow-sm">
      {/* Top Banner */}
      <div className="relative bg-black text-white text-center py-3 px-4 text-[10px] md:text-sm">
        <p>
          Sign up and get 20% off your first order.{' '}
          <Link href="/register" className="underline font-medium">
            Sign Up Now
          </Link>
        </p>
      </div>

      {/* Main Navbar */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className={cn('text-xl md:text-2xl font-bold', integralCF.className)}
            >
              SHOP.CO
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/products" className="hover:text-gray-600">
                Shop
              </Link>
              <Link href="#" className="hover:text-gray-600">
                On Sale
              </Link>
              <Link href="#" className="hover:text-gray-600">
                New Arrivals
              </Link>
              <Link href="#" className="hover:text-gray-600">
                Brands
              </Link>
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex w-[577px] h-[48px] border rounded-full items-center flex-1 max-w-md mx-8">
              <div className="relative w-full w-[577px] h-[48px] border rounded-full">
                <input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Icons with Cart Count */}
            <div className="flex items-center gap-4">
              <button className="lg:hidden">
                <Search className="h-6 w-6" />
              </button>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/login">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'absolute inset-0 bg-white transform transition-transform duration-300 lg:hidden',
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <div className="p-4">
          <button
            className="absolute right-4 top-4 p-2 text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            X
          </button>
          <nav className="mt-12 space-y-6">
            <Link
              href="/products"
              className="block text-lg hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="#"
              className="block text-lg hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              On Sale
            </Link>
            <Link
              href="#"
              className="block text-lg hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="/products"
              className="block text-lg hover:text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Brands
            </Link>
          </nav>

          {/* Mobile Search */}
          <div className="mt-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
