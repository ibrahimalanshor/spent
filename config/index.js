require('./env.js');

const path = require('path');

const appPort = process.env.PORT || process.env.APP_PORT || 4000;
const appUrl = process.env.APP_URL || `http://localhost:${appPort}`;

module.exports = {
  app: {
    port: appPort,
    url: appUrl,
  },
  upload_dir: path.resolve(
    __dirname,
    '../',
    process.env.UPLOAD_DIR || 'public'
  ),
  public_url: `${appUrl}/public`,
  db: {
    url: process.env.DB_URL,
  },
};
