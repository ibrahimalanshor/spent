const path = require('path');
const mode = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: path.resolve(__dirname, `../.env.${mode}`),
});
