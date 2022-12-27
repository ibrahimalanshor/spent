if (process.env.NODE_ENV === 'development') require('dotenv/config');

module.exports = {
  app: {
    port: process.env.PORT || process.env.APP_PORT || 4000,
  },
  db: {
    url: process.env.DB_URL,
  },
};
