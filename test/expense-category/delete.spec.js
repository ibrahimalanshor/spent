const ExpenseCategoryeModel = require('../../src/modules/expense-category/model/expense-category.model.js');
const request = require('supertest');
const chai = require('chai');

chai.should();

const createApp = require('../../lib/app.js');

describe('delete expense categories', function () {
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
      .delete('/expense-categories/foo')
      .expect(404)
      .end((err) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });

  it('should delete a expense category', (done) => {
    request('http://localhost:5000')
      .delete(`/expense-categories/${this.expenseCategory._id}`)
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
