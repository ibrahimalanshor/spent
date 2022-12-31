const config = require('../../../../config');

exports.proofUrl = function () {
  return this.proof
    ? `${config.public_url}/expense/proofs/${this.proof}`
    : null;
};
