const BalanceModel = require('../../src/modules/balance/model/balance.model.js');
const BalanceService = require('../../src/modules/balance/balance.service.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('add balance amount', function () {
  this.formData = {
    balanceId: null,
    amount: 10000,
  };

  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });
    this.balance = await BalanceModel.create({
      amount: 0,
    });
    this.formData.balanceId = this.balance._id;
  });

  after(async () => {
    this.server.stop();

    await this.balance.delete();
  });

  it('should create balance transactions', (done) => {
    request('http://localhost:5000')
      .post('/balance-transactions')
      .set('Content-Type', 'application/json')
      .send({
        balanceId: this.formData.balanceId,
        amount: this.formData.amount,
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

        done();
      });
  });

  it('should add increase amount', async () => {
    const balance = await BalanceService.findOne(this.balance._id);

    balance.amount.should.be.equal(this.formData.amount);
  });
});
