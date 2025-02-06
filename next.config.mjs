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
import dotenv from "dotenv";
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['bullet-mart.net.pk'], 
  },

  async rewrites() {
    return [
      {
        source: '/products/:id',
        destination: '/product/:id',
      },
    ];
  },
};

export default nextConfig;
