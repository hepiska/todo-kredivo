"use strict";

require("dotenv").config();

module.exports = {
  "development": {
    "username": "ego",
    "password": "ego",
    "database": "todo_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": true
  },
  "test": {
    "username": "ego",
    "password": "ego",
    "database": "todo_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": process.env.DB_USERNAME || "",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DATABASE || "",
    "host": process.env.HOST || "",
    "port": process.env.PORT || "5432",
    "dialect": "postgres",
    "logging": false
  }
};