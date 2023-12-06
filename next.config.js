require('dotenv').config();

module.exports = () => {
  return {
    reactStrictMode: true,
    env: {
      MONGODB_USERNAME: process.env.MONGODB_USERNAME,
      MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
      MONGODB_CLUSTERNAME: process.env.MONGODB_CLUSTERNAME,
      MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    },
    eslint: {
      dirs: ['pages/index.jsx'],
    },
  };
};
