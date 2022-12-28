module.exports = function createControllerMethod(Controller) {
  ['get', 'post', 'patch', 'delete'].forEach((item) => {
    Controller.prototype[item] = function (statusCode = null) {
      this.method = item;
      this.statusCode = statusCode;

      return this;
    };
  });
};
