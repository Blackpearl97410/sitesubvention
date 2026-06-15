/** @type {import('next').NextConfig} */
const nextConfig = {
  // Spline chargé côté client uniquement via dynamic import
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  async redirects() {
    return [
      {
        source: '/methode',
        destination: '/comment-ca-fonctionne',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
