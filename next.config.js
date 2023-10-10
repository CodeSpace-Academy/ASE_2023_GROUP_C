/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_username: 'keotshepilemaje',
    mongodb_password: 'RjZymySXvwjI3jFk',
    mongodb_clustername: 'cluster0',
    mongodb_database: 'dev-rep',
  }
}

module.exports = nextConfig
