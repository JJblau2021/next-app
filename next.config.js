/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "s1.ax1x.com",
        protocol: "https",
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
};

const withMDX = require("@next/mdx")();

module.exports = withMDX(nextConfig);
