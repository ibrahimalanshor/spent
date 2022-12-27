const mongoose = require('mongoose');

module.exports = async function connect(url, cb) {
  await mongoose.connect(url);

  cb ? cb(url) : console.log(`database connected to ${url}`);
};
