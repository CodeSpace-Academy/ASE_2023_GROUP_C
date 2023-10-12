const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
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
      MONGODB_PASSWORD: 'UFX6A2FJZLMhDuME', // Fixed the 'F' to uppercase
      MONGODB_CLUSTERNAME: 'groupc',
      MONGODB_DATABASE: 'devdb',
    },
  };
};
