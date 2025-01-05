/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/msds-dds-6306-fls-1' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
