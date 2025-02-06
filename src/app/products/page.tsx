
import { Suspense } from "react";
import ProductsGrid from "../components/products/productsGrid";


// Correct import (ensure casing matches the exported component)


export default function ProductsPage() {
  return (
    <>
      <h1>All Products</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Correct component usage */}
   <ProductsGrid/>
      </Suspense>
    </>
  );
}
