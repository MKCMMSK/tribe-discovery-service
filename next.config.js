/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.BASE_PATH || "",
  images: {
    domains: ['res.cloudinary.com'],
  }
}

module.exports = nextConfig
