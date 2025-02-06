import api from '@/utils/woocommerce'; // WooCommerce API instance

export default async function handler(req, res) {
  try {
    const response = await api.get('/cart'); // Replace with your WooCommerce cart endpoint
    res.status(200).json({ cart: response.data });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
}
