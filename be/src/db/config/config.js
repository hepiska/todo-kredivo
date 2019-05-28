require("dotenv").config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "",
    "password": process.env.DB_PASSWORD || "",
    "database": process.env.DATABASE || "",
    "host": process.env.HOST || "",
    "port": process.env.PORT || "5432",
    "dialect": "postgres",
    "logging": false,
  },
  "test": {
    "username": "ego",
    "password": "ego",
    "database": "todo_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
  },
  "production": {
    "use_env_variable": process.env.DATABASE_URL,
    // "password": process.env.DB_PASSWORD || "",
    // "database": process.env.DATABASE || "",
    // "host": process.env.HOST || "",
    // "port": process.env.PORT || "5432",
    "dialect": "postgres",
    "logging": false,
    "dialectOptions": {
      "ssl": true
    }
  },
}
