"use strict";

var _routes = _interopRequireDefault(require("routes"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _errorMidleware = require("libs/errorMidleware");

var _resJsonOnData = _interopRequireDefault(require("libs/resJsonOnData"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cookieParser from "cookie-parser"
const express = require("express");

const PORT = process.env.PORT || 4000;
const app = express(); // parse application/x-www-form-urlencoded

app.use((0, _morgan.default)("combined"));
app.use((0, _cors.default)());
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // parse application/json

app.use(_bodyParser.default.json());
app.use(_resJsonOnData.default);
app.use("/alive", (req, res) => {
  return res.json("alive");
});
app.use("/", (0, _routes.default)(express));
app.use(_errorMidleware.errorMidleware);
app.listen({
  port: PORT
}, () => {
  console.log(`server run on port ${PORT}`);
});