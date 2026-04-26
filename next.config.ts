/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "p16-capcut-va.ibyteimg.com", // Existing domain
      "avatars.githubusercontent.com", // Added domain for GitHub avatars
    ],
  },
};

module.exports = nextConfig;
