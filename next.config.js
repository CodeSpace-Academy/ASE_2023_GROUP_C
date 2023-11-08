const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        MONGODB_USERNAME: 'groupc',
        MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
        MONGODB_CLUSTERNAME: 'groupc',
        MONGODB_DATABASE: 'dev-dummy',
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      MONGODB_USERNAME: 'groupc',
      MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
      MONGODB_CLUSTERNAME: 'groupc',
      MONGODB_DATABASE: 'devdb',
    },
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['img.sndimg.com', 'images.pexels.com'], // Updated from remotePatterns to domains
  },
  eslint: {
    dirs: ['pages/tags'],
  },

};
