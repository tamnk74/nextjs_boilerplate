const path = require('path');

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const config = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname)]
  }
};

module.exports = config;
