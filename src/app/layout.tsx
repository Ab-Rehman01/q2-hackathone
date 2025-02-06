// "use client";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import "./globals.css";
// // In your layout.tsx or RootLayout.tsx
// // src/app/layout.tsx
// import { CartProvider } from "./components/context/CartContext";  // Import CartProvider

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50">
//         <CartProvider>  {/* Wrap the whole app in CartProvider */}
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }



"use client";
import { Navbar } from "@/app/components/Navbar";

import Footer from "./components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
