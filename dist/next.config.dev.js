"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  images: {
    remotePatterns: [{
      hostname: "avatars.githubusercontent.com",
      protocol: "https"
    }]
  }
};
module.exports = nextConfig;