const path = require('path');

if (process.env.NODE_ENV === 'development') require('dotenv/config');

const appUrl = process.env.APP_URL || `http://localhost:4000`;

module.exports = {
  app: {
    port: process.env.PORT || process.env.APP_PORT || 4000,
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
