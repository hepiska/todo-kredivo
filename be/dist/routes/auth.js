"use strict";

var _controlers = require("controlers");

module.exports = express => new express.Router().post("/register", _controlers.auth.register).post("/login", _controlers.auth.login);