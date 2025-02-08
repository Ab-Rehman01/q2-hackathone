// "use client";
// import { useEffect, useState } from "react";

// type CartItem = {
//   key: string;
//   id: number;
//   name: string;
//   quantity: number;
//   totals: {
//     line_total: string;
//     line_subtotal: string;
//   };
// };

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch("https://bullet-mart.net.pk/wp-json/wc/store/cart/items");
//         if (!response.ok) throw new Error("Failed to fetch cart data");

//         const data: CartItem[] = await response.json();
//         setCartItems(data);
//       } catch (err) {
//         setError((err as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         Array.isArray(cartItems) && cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div key={item.key} className="cart-item">
//               <h2>{item.name}</h2>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: {item.totals.line_total}</p>
//             </div>
//           ))
//         ) : (
//           <p>There was an error loading the cart items.</p>
//         )
//       )}
//     </div>
//   );
// }
// "use client";
// import { useEffect, useState } from "react";

// type CartItem = {
//   key: string;
//   name: string;
//   quantity: number;
//   totals: {
//     line_total: string;
//   };
// };

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]); // Type added
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch("https://bullet-mart.net.pk/wp-json/wc/store/cart/items");
//         if (!response.ok) throw new Error("Failed to fetch cart data");

//         const data: CartItem[] = await response.json(); // Type added
//         setCartItems(data);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         cartItems.map((item) => (
//           <div key={item.key} className="cart-item">
//             <h2>{item.name}</h2>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: {item.totals.line_total}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";

type CartItem = {
  key: string;
  name: string;
  quantity: number;
  totals: {
    line_total: string;
  };
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://bullet-mart.net.pk/wp-json/wc/store/cart/items");
        if (!response.ok) throw new Error("Failed to fetch cart data");

        const data: CartItem[] = await response.json();
        setCartItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.key} className="cart-item border p-4 my-2 rounded-lg shadow">
            <h2>{item.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.totals.line_total}</p>
          </div>
        ))
      )}
    </div>
  );
}
