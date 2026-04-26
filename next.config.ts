/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "p16-capcut-va.ibyteimg.com",
      "avatars.githubusercontent.com",
      "i.ibb.co.com",
    ],
  },
};

module.exports = nextConfig;