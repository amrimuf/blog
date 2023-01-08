/** @type {import('next').NextConfig} */
const { withPlaiceholder } = require("@plaiceholder/next");

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  // productionBrowserSourceMaps: true,
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
        source: '/blog/page/1',
        destination: '/blog',
        permanent: false,
      },
      {
        source: '/blog/page',
        destination: '/blog/',
        permanent: false,
      },
    ]
  },
}

module.exports = withPlaiceholder(nextConfig)
