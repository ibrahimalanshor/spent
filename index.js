const config = require('./config');
const tabri = require('@ibrahimalanshor/tabri');
const connect = require('./lib/database/connect.js');

const server = tabri({
  port: config.port,
});

connect(config.db.url)
  .then(() => {
    server.run();
  })
  .catch((err) => {
    console.error(err);

    process.exit(0);
  });
