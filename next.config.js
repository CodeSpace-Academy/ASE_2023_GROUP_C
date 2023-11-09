const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
<<<<<<< HEAD
  env: {
    MONGODB_USERNAME: 'groupc',
    MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
    MONGODB_CLUSTERNAME: 'groupc',
    MONGODB_DATABASE: 'devdb',
  },
  }
}


return {
  reactStrictMode: true,
  env: {
    MONGODB_USERNAME: 'groupc',
    MONGODB_PASSWORD: 'UFX6A2FjZLMhDuME',
    MONGODB_CLUSTERNAME: 'groupc',
    MONGODB_DATABASE: 'dev-dummy',
  },
}
}

=======
      env: {
        MONGODB_USERNAME: "groupc",
        MONGODB_PASSWORD: "UFX6A2FjZLMhDuME",
        MONGODB_CLUSTERNAME: "groupc",
        MONGODB_DATABASE: "dev-dummy",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      MONGODB_USERNAME: "groupc",
      MONGODB_PASSWORD: "UFX6A2FjZLMhDuME",
      MONGODB_CLUSTERNAME: "groupc",
      MONGODB_DATABASE: "devdb",
    },
  };
};
>>>>>>> bd7df3d7dec03e2853cb51a549e0ffc67c648021
