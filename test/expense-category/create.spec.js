const ExpenseCategoryeModel = require('../../src/modules/expense-category/model/expense-category.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('create expense category', function () {
  this.expenseCategoryId = null;
  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });
  });

  after(async () => {
    this.server.stop();

    await ExpenseCategoryeModel.deleteOne({ _id: this.expenseCategoryId });
  });

  it('should return validation error', (done) => {
    request('http://localhost:5000')
      .post('/expense-categories')
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

  it('should success create a expense category', (done) => {
    request('http://localhost:5000')
      .post('/expense-categories')
      .set('Content-Type', 'application/json')
      .send({
        name: 'test',
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

        this.expenseCategoryId = res.body.data._id;

        done();
      });
  });
});
