import { Suspense } from "react";
import ProductsGrid from "../components/products/productsGrid";

export default function ProductsPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <ProductsGrid />
      </Suspense>
    </>
  );
}
