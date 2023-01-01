require('chai').should();

const request = require('supertest');

const BalanceModel = require('../../src/modules/balance/model/balance.model.js');
const ExpenseModel = require('../../src/modules/expense/model/expense.model.js');

const createApp = require('../../lib/app.js');

describe('find one expense', function () {
  this.balance = null;
  this.expense = null;

  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });

    this.balance = await BalanceModel.create({
      amount: 10000,
    });
    this.expense = await ExpenseModel.create({
      balanceId: this.balance._id,
      amount: 10000,
    });
  });

  after(async () => {
    this.server.stop();

    await this.balance.delete();
    await this.expense.delete();
  });

  it('should return not found', function (done) {
    request('http://localhost:5000')
      .get('/expenses/foo')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should found a expense', (done) => {
    request('http://localhost:5000')
      .get(`/expenses/${this.expense._id}`)
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
