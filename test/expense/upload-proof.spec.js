const request = require('supertest');
const chai = require('chai');
const path = require('path');

chai.should();

const BalanceModel = require('../../src/modules/balance/model/balance.model.js');
const ExpenseModel = require('../../src/modules/expense/model/expense.model.js');

const createApp = require('../../lib/app.js');

describe('upload expense proof', function () {
  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });
    this.balance = await BalanceModel.create({
      amount: 10000,
    });
    this.expense = await ExpenseModel.create({
      amount: 10000,
      balanceId: this.balance._id,
    });
  });

  after(async () => {
    this.server.stop();

    await this.balance.delete();
    await this.expense.delete();
  });

  it('should return validation file required error', (done) => {
    request('http://localhost:5000')
      .patch('/expenses/dev/proof')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should return validation mimetype error', (done) => {
    request('http://localhost:5000')
      .patch('/expenses/dev/proof')
      .attach(
        'file',
        path.resolve(__dirname, '../resources/expense-proof.json')
      )
      .expect(400)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should return 404 expense not found', (done) => {
    request('http://localhost:5000')
      .patch('/expenses/dev/proof')
      .attach('file', path.resolve(__dirname, '../resources/expense-proof.png'))
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');

        done();
      });
  });

  it('should success update expense proof', (done) => {
    request('http://localhost:5000')
      .patch(`/expenses/${this.expense._id}/proof`)
      .attach('file', path.resolve(__dirname, '../resources/expense-proof.png'))
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');

        done();
      });
  });

  // it (should return uploaded proof)
});
