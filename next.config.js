/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/msds-dds-6306-fls-1',
  assetPrefix: '/msds-dds-6306-fls-1/',
  images: {
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig
