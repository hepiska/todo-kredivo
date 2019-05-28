"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.reqUserFromToken = exports.decodeJwt = exports.verifyJwt = exports.signJwt = void 0;

const jwt = require("jsonwebtoken");

const signJwt = data => {
  return jwt.sign({ ...data
  }, process.env.SECRET);
};

exports.signJwt = signJwt;

const verifyJwt = token => jwt.verify(token, process.env.SECRET);

exports.verifyJwt = verifyJwt;

const decodeJwt = token => jwt.decode(token);

exports.decodeJwt = decodeJwt;

const reqUserFromToken = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization;
    req.user = verifyJwt(token);
    return next();
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 401;
    return next(error);
  }
};

exports.reqUserFromToken = reqUserFromToken;
var _default = jwt;
exports.default = _default;