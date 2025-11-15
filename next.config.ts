import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org' }
    ]
  },
  turbopack: {
    root: '/Users/kottakotaleepika/streaming-dashboard-v2'
  }
}

export default nextConfig
