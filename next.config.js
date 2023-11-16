const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = {
  eslint: {
    dirs: ['pages/index.jsx'],
  },
};


module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        MONGODB_USERNAME: 'groupc',
        MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
        MONGODB_CLUSTERNAME: 'groupc',
        MONGODB_DATABASE: 'dev-dummy',
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
      MONGODB_USERNAME: 'groupc',
      MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
      MONGODB_CLUSTERNAME: 'groupc',
      MONGODB_DATABASE: 'devdb',
    },
  };
};