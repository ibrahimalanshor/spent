const config = require('../config');
const tabri = require('@ibrahimalanshor/tabri');
const connect = require('../lib/database/connect.js');

async function createApp(customConfig = {}) {
  try {
    await connect(config.db.url, (url) => {
      if (customConfig.logging ?? true) {
        console.log(`database connected to ${url}`);
      }
    });

    const server = tabri({
      port: config.port,
      routes: require('../src/modules/routes.js'),
      i18n: {
        messages: require('../resources/messages'),
        defaultLocale: 'en',
      },
      ...customConfig,
    });

    server.run((port) => {
      if (customConfig.logging ?? true) {
        console.log(`server running at ${port}`);
      }
    });

    return server;
  } catch (err) {
    console.error(err);

    process.exit(0);
  }
}

module.exports = createApp;
