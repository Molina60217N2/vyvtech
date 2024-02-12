/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/productos',
        destination: '/productos/page/0'
      },
    ]
  },
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
}

module.exports = nextConfig
