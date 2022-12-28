exports.extendPrototype = function (source, target) {
  source.prototype = Object.create(target.prototype, {
    constructor: {
      value: source,
    },
  });
};
