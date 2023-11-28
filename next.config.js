// next.config.js
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
require('dotenv').config(); // Load environment variables from .env.local

module.exports = (phase) => {
  const isDevelopment = process.env.PHASE_DEVELOPMENT_SERVER === 'true';

  const mongodbDatabase = isDevelopment
    ? process.env.MONGODB_DATABASE_DEV
    : process.env.MONGODB_DATABASE_PROD;

  return {
    reactStrictMode: true,
    env: {
      MONGODB_USERNAME: process.env.MONGODB_USERNAME,
      MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
      MONGODB_CLUSTERNAME: process.env.MONGODB_CLUSTERNAME,
      MONGODB_DATABASE: mongodbDatabase,
    },
  };
};