import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // images: {
  //   unoptimized: true,
  // },
  // output: 'export',
  // async headers() {
  //   return [
  //     {
  //       // Routes this applies to
  //       source: "/api/(.*)",
  //       // Headers
  //       headers: [
  //         // Allow for specific domains to have access or * for all
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //           // DOES NOT WORK
  //           // value: process.env.ALLOWED_ORIGIN,
  //         },
  //         // Allows for specific methods accepted
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         // Allows for specific headers accepted (These are a few standard ones)
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "Content-Type, Authorization",
  //         },
  //       ],
  //     },
  //   ];
  // },

  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

export default withPWA({
  dest: "public", // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);

// export default nextConfig;
