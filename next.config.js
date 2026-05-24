/** @type {import('next').NextConfig} */
const nextConfig = {
  // Spline chargé côté client uniquement via dynamic import
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
}

module.exports = nextConfig
