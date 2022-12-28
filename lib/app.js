const config = require('../config');
const tabri = require('@ibrahimalanshor/tabri');
const connect = require('../lib/database/connect.js');

async function createApp(customConfig) {
  try {
    await connect(config.db.url);

    const server = tabri({
      port: config.port,
      routes: require('../src/modules/routes.js'),
      i18n: {
        messages: require('../resources/messages'),
        defaultLocale: 'en',
      },
      ...customConfig,
    });

    server.run();

    return server;
  } catch (err) {
    console.error(err);

    process.exit(0);
  }
}

module.exports = createApp;
