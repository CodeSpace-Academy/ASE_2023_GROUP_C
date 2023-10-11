//next.config.js

module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_USERNAME: 'groupc',
    MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
    MONGODB_CLUSTERNAME: 'groupc',
    MONGODB_DATABASE: 'devdb',
  },
};

const errorMessages = {
  emptyEnvObject: 'The `env` object is not defined in the environment.',
};

if (module.exports.env === undefined) {
  console.error(errorMessages.emptyEnvObject);
  throw new Error(errorMessages.emptyEnvObject);
}
