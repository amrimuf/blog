/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/*',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blog/page/1',
        permanent: false,
      },
      {
        source: '/blog/page',
        destination: '/blog/page/1',
        permanent: false,
      },
    ]
  },
}

module.exports = withPlaiceholder(nextConfig)
