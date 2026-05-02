import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: '.',
    },
  },
};

export default process.env.NODE_ENV === "production" 
  ? withPWAInit({
      dest: "public",
      register: true,
      skipWaiting: true,
    })(nextConfig)
  : nextConfig;
