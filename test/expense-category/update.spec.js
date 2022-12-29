const ExpenseCategoryeModel = require('../../src/modules/expense-category/model/expense-category.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('update expense categories', function () {
  this.expenseCategory = null;

  before(async () => {
    this.server = await createApp({ logging: false, port: 5000 });

    this.expenseCategory = await ExpenseCategoryeModel.create({
      name: 'test',
    });
  });

  after(async () => {
    this.server.stop();

    await this.expenseCategory.delete();
  });

  it('should return not found', function (done) {
    request('http://localhost:5000')
      .patch('/expense-categories/foo')
      .set('Content-Type', 'application/json')
      .send({
        name: 'update test',
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
      .patch(`/expense-categories/${this.expenseCategory._id}`)
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

  it('should update a expense category', (done) => {
    request('http://localhost:5000')
      .patch(`/expense-categories/${this.expenseCategory._id}`)
      .set('Content-Type', 'application/json')
      .send({
        name: 'update test',
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
