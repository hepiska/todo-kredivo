"use strict";

var _controlers = require("controlers");

var _jwt = require("libs/jwt");

module.exports = express => new express.Router().use(_jwt.reqUserFromToken).post("/", _controlers.todo.create).get("/user", _controlers.todo.readByUser).put("/:id", _controlers.todo.edit).get("/:id", _controlers.todo.readOne).delete("/:id", _controlers.todo.delete);