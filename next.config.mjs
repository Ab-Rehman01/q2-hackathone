/** @type {import('next').NextConfig} */
//const nextConfig = {
  // Enabling React strict mode for better debugging
 // reactStrictMode: true,

  // Configuring external domains for image optimization
  // images: {
  //   domains: ['bullet-mart.net.pk'], // Add your WordPress domain here
  // },

  // Adding environment variables for API credentials (optional, for security)
//   env: {
//     WOOCOMMERCE_API_URL: 'https://bullet-mart.net.pk/wp-json/wc/v2',
//     WOOCOMMERCE_CONSUMER_KEY: 'ck_4d8f7803a273776e7580392e4321dec1b2419f64',
//     WOOCOMMERCE_CONSUMER_SECRET: 'ycs_389064adc7a044a1a229b960656ce51a06aba454',
//   },

//   // Adding rewrites for dynamic routes
//   async rewrites() {
//     return [
//       {
//         source: '/products/:id',
//         destination: '/product/:id',
//       },
//     ];
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    WOO_COMMERCE_CONSUMER_KEY: process.env.WOO_COMMERCE_CONSUMER_KEY,
    WOO_COMMERCE_CONSUMER_SECRET: process.env.WOO_COMMERCE_CONSUMER_SECRET,
    NEXT_PUBLIC_WOO_COMMERCE_URL: process.env.NEXT_PUBLIC_WOO_COMMERCE_URL,
  },

  images: {
    domains: ["bullet-mart.net.pk", "via.placeholder.com"], 
  },
};

console.log("🔑 Consumer Key:", process.env.WOO_COMMERCE_CONSUMER_KEY);
console.log("🔑 Consumer Secret:", process.env.WOO_COMMERCE_CONSUMER_SECRET);
console.log("🌍 WooCommerce URL:", process.env.NEXT_PUBLIC_WOO_COMMERCE_URL);

export default nextConfig;


