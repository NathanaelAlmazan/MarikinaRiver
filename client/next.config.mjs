import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  register: true,
  scope: "/app",
  sw: "service-worker.js"
});

// Your Next config is automatically typed!
export default withPWA({
  reactStrictMode: true, // Enable React strict mode for improved error handling
});