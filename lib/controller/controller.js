const createControllerMethod = require('./controller-method.js');

function Controller() {
  this.ctxs = [];
}

createControllerMethod(Controller);

Controller.prototype.handle = function (handler) {
  return async (req, res, next) => {
    try {
      const data = await await handler.call(this, this.getCtx(req));

      return res.status(this.getStatus()).json({
        status: this.getStatus(),
        name: req.polyglot.t(`http.${this.getStatus()}`),
        data,
      });
    } catch (err) {
      next(err);
    }
  };
};

Controller.prototype.ctx = function (...props) {
  this.ctxs = props;

  return this;
};

Controller.prototype.getCtx = function (req) {
  const resCtx = {};

  this.ctxs.forEach((ctx) => {
    switch (ctx) {
      case 'query':
        resCtx.query = req.query;
        break;
      case 'body':
        resCtx.body = req.body;
        break;
      case 'params':
        resCtx.params = req.params;
        break;
      case 'user':
        resCtx.user = req.user;
        break;
      case 'auth':
        resCtx.auth = req.auth;
        break;
      case 'polyglot':
        resCtx.polyglot = req.polyglot;
        break;
      case 'file':
        resCtx.file = req.file;
        break;
      default:
        break;
    }
  });

  return resCtx;
};

Controller.prototype.getStatus = function () {
  const methodStatus = {
    get: 200,
    post: 201,
    patch: 200,
    delete: 200,
  };

  return this.statusCode || methodStatus[this.method];
};

module.exports = Controller;
