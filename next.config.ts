import path from 'path';

const nextConfig = {
  experimental: {
    turbopack: true,
    outputFileTracingRoot: path.join(__dirname, 'src'),
    turbopack: {
      root: path.join(__dirname, 'src'),
    },
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
