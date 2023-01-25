const BalanceTransactionCategoryeModel = require('../../src/modules/balance-transaction-category/model/balance-transaction-category.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('find one balance transaction categories', function () {
  this.balanceTransactionCategory = null;

  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });

    this.balanceTransactionCategory =
      await BalanceTransactionCategoryeModel.create({
        name: 'test',
      });
  });

  after(async () => {
    this.server.stop();

    await this.balanceTransactionCategory.delete();
  });

  it('should return not found', function (done) {
    request('http://localhost:5000')
      .get('/balance-transaction-categories/foo')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should found a balance transaction category', (done) => {
    request('http://localhost:5000')
      .get(
        `/balance-transaction-categories/${this.balanceTransactionCategory._id}`
      )
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('_id');

        done();
      });
  });
});
