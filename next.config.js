/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/MSDS_6306_Doing-Data-Science' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
