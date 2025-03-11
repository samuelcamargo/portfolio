/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'lib', 'src', 'app']
  },
  images: {
    domains: ['api.github.com', 'raw.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false;
    }
    
    // Resolver para problemas com date-fns e @mui/x-date-pickers
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'date-fns': path.resolve(__dirname, 'node_modules/date-fns'),
      },
    };
    
    return config;
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          }
        ]
      }
    ]
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig 