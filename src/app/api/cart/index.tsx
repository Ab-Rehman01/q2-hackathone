// pages/api/cart/index.js
import api from '../../../utils/woocommerce';

export default async function handler(req, res) {
  try {
    const response = await api.get('cart');
    res.status(200).json({ cart: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
