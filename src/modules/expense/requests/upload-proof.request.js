const { createStorage } = require('@ibrahimalanshor/tabri');
const path = require('path');
const config = require('../../../../config');

module.exports = createStorage({
  field: 'file',
  allowedExtension: ['.png', '.jpg'],
  getPath: () => path.resolve(config.upload_dir, 'expense/proofs'),
  getFilename: (req, file) =>
    'proof-' + Date.now() + path.extname(file.originalname),
});
