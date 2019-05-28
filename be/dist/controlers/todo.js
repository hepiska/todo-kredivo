"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _dataAccess = require("dataAccess");

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createSchema = _joi.default.object().keys({
  title: _joi.default.string().min(1).required(),
  isDone: _joi.default.boolean().default(false),
  priority: _joi.default.number().valid([1, 2, 3]).default(3),
  note: _joi.default.string()
});

const editSchema = _joi.default.object().keys({
  title: _joi.default.string().min(1),
  isDone: _joi.default.boolean().default(false),
  priority: _joi.default.number().valid([1, 2, 3]),
  note: _joi.default.string()
});

const readSchema = _joi.default.object().keys({
  limit: _joi.default.number().default(10),
  skip: _joi.default.number().default(0),
  q: _joi.default.string().allow("").trim(),
  sort: _joi.default.number().default(0),
  filter: _joi.default.string().lowercase().default("all")
});

const todoControler = {
  create: async (req, res, next) => {
    try {
      await _joi.default.validate(req.body, createSchema);
      const todoData = { ...req.body
      };
      todoData.user_id = req.user.id;
      const todo = await _dataAccess.todo.create(todoData);
      return res.json(todo);
    } catch (error) {
      return next(error);
    }
  },
  readByUser: async (req, res, next) => {
    try {
      const params = await _joi.default.validate(req.query, readSchema, {
        stripUnknown: true
      });
      const user_id = req.user.id;
      const filter = {};

      if (params.q) {
        filter.title = {
          [_sequelize.Op.iLike]: `%${params.q}%`
        };
      }

      if (params.filter && params.filter !== "all") {
        switch (params.filter) {
          case "done":
            filter.isDone = true;
            break;

          default:
            filter.isDone = false;
            break;
        }
      }

      const todo = await _dataAccess.todo.getByUser(user_id, {
        filter,
        sort: params.sort,
        skip: params.skip,
        limit: params.limit
      });
      return res.json(todo);
    } catch (error) {
      return next(error);
    }
  },
  edit: async (req, res, next) => {
    try {
      await _joi.default.validate(req.params.id, _joi.default.number());
      const params = await _joi.default.validate(req.body, editSchema, {
        stripUnknown: true
      });
      const newTodo = await _dataAccess.todo.update(req.params.id, params);
      return res.json(newTodo);
    } catch (error) {
      return next(error);
    }
  },
  readOne: async (req, res, next) => {
    try {
      await _joi.default.validate(req.params.id, _joi.default.number());
      const todo = await _dataAccess.todo.findOne(req.params.id);
      return res.json(todo);
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      await _joi.default.validate(req.params.id, _joi.default.number());
      await _dataAccess.todo.delete(req.params.id);
      return res.json({
        message: "delete succes"
      });
    } catch (error) {
      return next(error);
    }
  }
};
var _default = todoControler;
exports.default = _default;