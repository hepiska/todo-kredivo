"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../db/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userDA = {
  create: data => {
    return _models.default.User.create(data).then(res => res.dataValues);
  },
  findOneByEmail: email => {
    const condition = {
      where: {
        email
      }
    };
    return _models.default.User.findOne(condition).then(res => res && res.dataValues);
  }
};
var _default = userDA;
exports.default = _default;