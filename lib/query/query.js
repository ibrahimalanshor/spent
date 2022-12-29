const { isValidObjectId } = require('mongoose');
const {
  exceptions: { NotFoundException },
} = require('@ibrahimalanshor/tabri');
const QueryHelper = require('./query-helper.js');

function Query(model) {
  this.model = model;

  this.whereFields = {};
  this.selectFields = {};
  this.populate = [];
  this.sortField = null;
  this.limitNum = null;
  this.offsetNum = null;
}

Query.prototype.count = async function () {
  return await this.model.count(this.whereFields);
};

Query.prototype.exists = async function () {
  return await this.model.exists(this.whereFields);
};

Query.prototype.get = async function () {
  return await this.model
    .find(this.whereFields)
    .select(this.selectFields)
    .skip(this.offsetNum)
    .limit(this.limitNum)
    .sort(this.sortField)
    .populate(this.populate);
};

Query.prototype.paginate = async function ({ page, limit }) {
  this.limit(limit);
  this.offset((page - 1) * limit);

  return await this.get();
};

Query.prototype.find = async function (config = {}) {
  const res = await this.model
    .findOne(this.whereFields)
    .select(this.selectFields)
    .sort(this.sortField)
    .populate(this.populate);

  if (config.throwOnFail && res === null) {
    throw new NotFoundException();
  }

  return res;
};

Query.prototype.findOrFail = async function () {
  return await this.find({ throwOnFail: true });
};

Query.prototype.findByIdOrFail = async function (id) {
  return await this.whereObjectId('_id', id).findOrFail();
};

Query.prototype.select = function (fields) {
  this.selectFields = fields;

  return this;
};

Query.prototype.where = function (field, value, options = {}) {
  if (value !== undefined) {
    if (typeof value === 'string' && QueryHelper.valueHasOperator(value)) {
      this.whereFields[field] = QueryHelper.normalizeValueWithOperator(value);
    } else {
      this.whereFields[field] = !options.customOperator
        ? {
            [options.operator ?? '$eq']: value,
          }
        : value;
    }
  }
  return this;
};

Query.prototype.whereObjectId = function (field, value, options = {}) {
  if (!isValidObjectId(value)) {
    if (options.throw ?? true) {
      throw new NotFoundException();
    }

    return this;
  }

  return this.where(field, value, options);
};

Query.prototype.search = function (field, value) {
  if (value) {
    return this.where(
      field,
      {
        $regex: value,
        $options: 'i',
      },
      {
        customOperator: true,
      }
    );
  }

  return this;
};

Query.prototype.sort = function (field) {
  if (field) {
    this.sortField = field;
  }

  return this;
};

Query.prototype.limit = function (limit) {
  if (limit) {
    this.limitNum = limit;
  }

  return this;
};

Query.prototype.offset = function (offset) {
  if (offset) {
    this.offsetNum = offset;
  }

  return this;
};

Query.prototype.with = function (paths) {
  this.populate = paths;

  return this;
};

Query.prototype.if = function (cond, handler) {
  if (cond) {
    handler(this);
  }

  return this;
};

module.exports = Query;
