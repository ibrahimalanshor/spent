const config = require('./config');
const tabri = require('@ibrahimalanshor/tabri');
const connect = require('./lib/database/connect.js');

const server = tabri({
  port: config.port,
  routes: require('./src/modules/routes.js'),
  i18n: {
    messages: require('./resources/messages'),
    defaultLocale: 'en',
  },
});

connect(config.db.url)
  .then(() => {
    server.run();
  })
  .catch((err) => {
    console.error(err);

    process.exit(0);
  });
