/** @type {import('next').NextConfig} */
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
    ]
  },
}

module.exports = nextConfig
