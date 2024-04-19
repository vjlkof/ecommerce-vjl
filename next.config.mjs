/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tienda-cdn.bonvivir.com",
        port: "",
        pathname: "/catalog/product/cache/3538cf6925d8e4c2f44bd5c16a20a410/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
