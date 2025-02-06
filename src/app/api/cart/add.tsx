import api from '@/utils/woocommerce'; // Axios instance ka import

export async function POST(request) {
  try {
    const { productId, quantity } = await request.json(); // Request body se data parse karein

    // WooCommerce API ka cart add endpoint call karein
    const response = await api.post('/cart/add', {
      id: productId,
      quantity,
    });

    return new Response(
      JSON.stringify({ success: true, data: response.data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.response?.data || error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
