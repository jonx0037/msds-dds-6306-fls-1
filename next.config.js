/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_ACTIONS ? '/msds-dds-6306-fls-1' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/msds-dds-6306-fls-1/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig
