const BalanceModel = require('../../src/modules/balance/model/balance.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('create balance transaction', function () {
  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });
    this.balance = await BalanceModel.create({
      amount: 0,
    });
  });

  after(async () => {
    this.server.stop();

    await this.balance.delete();
  });

  it('should return validation error', (done) => {
    request('http://localhost:4000')
      .post('/balance-transactions')
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

  it('should return validation error if the amount is zero', (done) => {
    request('http://localhost:4000')
      .post('/balance-transactions')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: this.balance._id,
        amount: 0,
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

  it('should return validation error if the balance is not found', (done) => {
    request('http://localhost:4000')
      .post('/balance-transactions')
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

  it('should return validation error if the amount is lower than the balance amount', (done) => {
    request('http://localhost:4000')
      .post('/balance-transactions')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: '63ac3e4aa5e6458226dc78f1',
        amount: -1000,
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

  it('should success create balance transaction', (done) => {
    request('http://localhost:4000')
      .post('/balance-transactions')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: this.balance._id,
        amount: 10000,
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
});
