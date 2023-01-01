require('chai').should();

const request = require('supertest');

const BalanceModel = require('../../src/modules/balance/model/balance.model.js');

const createApp = require('../../lib/app.js');

describe('find one balance', function () {
  this.balance = null;

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

  it('should return not found', function (done) {
    request('http://localhost:5000')
      .get('/balances/foo')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should found a balance', (done) => {
    request('http://localhost:5000')
      .get(`/balances/${this.balance._id}`)
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
