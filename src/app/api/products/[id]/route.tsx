import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log("API Request for Product ID:", id); // Debugging

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is missing" },
        { status: 400 }
      );
    }

    // Fetch from WooCommerce API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WOO_COMMERCE_URL}/wp-json/wc/v3/products/${id}`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.WOO_COMMERCE_CONSUMER_KEY}:${process.env.WOO_COMMERCE_CONSUMER_SECRET}`
          )}`,
        },
      }
    );

    console.log("API Response Status:", res.status); // Debugging

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `Product not found: ${errorText}` },
        { status: res.status }
      );
    }

    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
