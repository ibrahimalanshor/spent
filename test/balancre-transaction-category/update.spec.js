const BalanceTransactionCategoryeModel = require('../../src/modules/balance-transaction-category/model/balance-transaction-category.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('update balance transaction categories', function () {
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
      .patch('/balance-transaction-categories/foo')
      .set('Content-Type', 'application/json')
      .send({
        name: 'update test',
        type: 'expense',
      })
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should return validation error', (done) => {
    request('http://localhost:5000')
      .patch(
        `/balance-transaction-categories/${this.balanceTransactionCategory._id}`
      )
      .set('Content-Type', 'application/json')
      .send({
        type: 'unknown',
      })
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

  it('should update a balance transaction category', (done) => {
    request('http://localhost:5000')
      .patch(
        `/balance-transaction-categories/${this.balanceTransactionCategory._id}`
      )
      .set('Content-Type', 'application/json')
      .send({
        name: 'update test',
        type: 'expense',
      })
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
