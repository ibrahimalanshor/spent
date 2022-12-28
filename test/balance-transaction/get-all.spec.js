const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('get all balance transactions', function () {
  before(async () => {
    this.server = await createApp({ logging: false });
  });

  after(() => {
    this.server.stop();
  });

  it('should return all balance transactions', function (done) {
    request('http://localhost:4000')
      .get('/balance-transactions')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('count');
        res.body.data.should.have.property('docs');
        res.body.data.count.should.be.a('number');
        res.body.data.docs.should.be.a('array');

        done();
      });
  });
});
