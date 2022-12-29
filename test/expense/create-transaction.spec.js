const BalanceModel = require('../../src/modules/balance/model/balance.model.js');
const BalanceService = require('../../src/modules/balance/balance.service.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('create expense', function () {
  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });
    this.balance = await BalanceModel.create({
      amount: 10000,
    });
  });

  after(async () => {
    this.server.stop();

    await this.balance.delete();
  });

  it('should return validation error', (done) => {
    request('http://localhost:5000')
      .post('/expenses')
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

  it('should return validation error if the amount is less than zero', (done) => {
    request('http://localhost:5000')
      .post('/expenses')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: this.balance._id,
        amount: -1000,
      })
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.be.a('object');
        res.body.errors.should.have.property('amount');

        done();
      });
  });

  it('should return validation error if the balance or the expense category is not found', (done) => {
    request('http://localhost:5000')
      .post('/expenses')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: '63ac3e4aa5e6458226dc78f1',
        amount: 1000,
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');

        done();
      });
  });

  it('should return validation error if the amount is greater than the balance amount', (done) => {
    request('http://localhost:5000')
      .post('/expenses')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: '63ac3e4aa5e6458226dc78f1',
        amount: 15000,
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');

        done();
      });
  });

  it('should success create expense', (done) => {
    request('http://localhost:5000')
      .post('/expenses')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: this.balance._id,
        amount: 5000,
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');

        done();
      });
  });

  it('should reduce balance amount', async () => {
    const balance = await BalanceService.findOne(this.balance._id);

    balance.amount.should.be.equal(5000);
  });
});
