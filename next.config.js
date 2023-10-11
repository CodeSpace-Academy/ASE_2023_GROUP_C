const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const MONGODB_USERNAME=groupc
const MONGODB_PASSWORD=UFX6A2FjZLMhDuME
const MONGODB_CLUSTERNAME=groupc
const MONGODB_DATABASE_DEV=dev-dummy
const MONGODB_DATABASE=devdb

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        MONGODB_USERNAME: process.env.MONGODB_USERNAME,
        MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
        MONGODB_CLUSTERNAME: process.env.MONGODB_CLUSTERNAME,
        MONGODB_DATABASE: process.env.MONGODB_DATABASE_DEV,
      },
    }
  }

  return {
    env: {
      MONGODB_USERNAME: process.env.MONGODB_USERNAME,
      MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
      MONGODB_CLUSTERNAME: process.env.MONGODB_CLUSTERNAME,
      MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    },
  }
}