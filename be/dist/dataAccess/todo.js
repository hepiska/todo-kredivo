"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../db/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSort = sort => {
  switch (sort) {
    case 0:
      return ["createdAt", "ASC"];

    case 1:
      return ["createdAt", "DESC"];

    case 2:
      return ["priority", "ASC"];

    case 3:
      return ["priority", "DESC"];

    default:
      return ["createdAt", "ASC"];
  }
};

const userDA = {
  create: data => {
    return _models.default.Todo.create(data).then(res => res.dataValues);
  },
  getByUser: (user_id, {
    filter,
    sort = 0,
    skip = 0,
    limit = 10
  }) => {
    let where = {
      user_id
    };

    if (filter) {
      where = { ...where,
        ...filter
      };
    }

    const order = [getSort(sort)];
    return _models.default.Todo.findAll({
      where,
      offset: skip * limit,
      limit,
      order
    }).then(res => {
      return res;
    });
  },
  update: async (id, data) => {
    const oldData = await _models.default.Todo.findOne({
      where: {
        id
      }
    });

    if (!oldData) {
      throw new Error("data not found");
    }

    const newData = { ...oldData.dataValues,
      ...data
    };
    return oldData.update(newData).then(res => res.dataValues);
  },
  findOne: id => {
    return _models.default.Todo.findOne({
      where: {
        id
      }
    }).then(res => {
      if (!res) {
        throw new Error("data not found");
      }

      return res.dataValues;
    });
  },
  delete: id => {
    return _models.default.Todo.destroy({
      where: {
        id
      }
    }).then(res => res.dataValues);
  }
};
var _default = userDA;
exports.default = _default;