"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwt = require("libs/jwt");

var _dataAccess = require("dataAccess");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerSchema = _joi.default.object().keys({
  email: _joi.default.string().email({
    minDomainSegments: 2
  }).required(),
  password: _joi.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  name: _joi.default.string().min(1).required()
});

const loginSchema = _joi.default.object().keys({
  email: _joi.default.string().email({
    minDomainSegments: 2
  }).required(),
  password: _joi.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

const userControler = {
  register: async (req, res, next) => {
    try {
      await _joi.default.validate(req.body, registerSchema);
      const userData = { ...req.body
      };
      const user = await _dataAccess.user.create(userData);
      Reflect.deleteProperty(user, "password");
      const token = (0, _jwt.signJwt)(user);
      return res.json({
        token
      });
    } catch (error) {
      return next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      await _joi.default.validate(req.body, loginSchema);
      const loginData = { ...req.body
      };
      const user = await _dataAccess.user.findOneByEmail(loginData.email);

      if (!user) {
        throw new Error("email or password un match");
      }

      const isPasswordMatch = _bcrypt.default.compareSync(loginData.password, user.password);

      if (!isPasswordMatch) {
        throw new Error("email or password un match");
      }

      Reflect.deleteProperty(user, "password");
      const token = (0, _jwt.signJwt)(user);
      return res.json({
        token
      });
    } catch (error) {
      return next(error);
    }
  }
};
var _default = userControler;
exports.default = _default;