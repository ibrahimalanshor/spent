const BalanceTransactionCategoryeModel = require('../../src/modules/balance-transaction-category/model/balance-transaction-category.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('create balance transaction category', function () {
  this.balanceTransactionCategoryId = null;
  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });
  });

  after(async () => {
    this.server.stop();

    await BalanceTransactionCategoryeModel.deleteOne({
      _id: this.balanceTransactionCategoryId,
    });
  });

  it('should return validation error', (done) => {
    request('http://localhost:5000')
      .post('/balance-transaction-categories')
      .set('Content-Type', 'application/json')
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');

        done();
      });
  });

  it('should success create a balance transaction category', (done) => {
    request('http://localhost:5000')
      .post('/balance-transaction-categories')
      .set('Content-Type', 'application/json')
      .send({
        name: 'test',
        type: 'expense',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('_id');

        this.balanceTransactionCategoryId = res.body.data._id;

        done();
      });
  });
});
