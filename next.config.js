/** @type {import('next').NextConfig} */
const nextConfig = {
  turbo: {
    // Disable turbopack to avoid internal Rust panics
    loaders: {},
  },
}

module.exports = nextConfig
