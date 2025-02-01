/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'lib', 'src', 'app']
  }
}

module.exports = nextConfig 