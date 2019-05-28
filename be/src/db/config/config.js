require("dotenv").config()

module.exports = {
  "development": {
    "username": "ego",
    "password": "ego",
    "database": "todo_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": true,
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
    "use_env_variable": "postgres://rlmsljsoztsomh:38c7aa27c655a3a732250bdab6aa07ee47d231cabc209b7af2f6c6c5e5b128b2@ec2-23-23-228-132.compute-1.amazonaws.com:5432/debtehog2jkgp6",
    // "password": process.env.DB_PASSWORD || "",
    // "database": process.env.DATABASE || "",
    // "host": process.env.HOST || "",
    // "port": process.env.PORT || "5432",
    "dialect": "postgres",
    "logging": false
  },
  // "production": {
  //   "username": process.env.DB_USERNAME || "rlmsljsoztsomh",
  //   "password": process.env.DB_PASSWORD || "38c7aa27c655a3a732250bdab6aa07ee47d231cabc209b7af2f6c6c5e5b128b2",
  //   "database": process.env.DATABASE || "debtehog2jkgp6",
  //   "host": process.env.HOST || "ec2-23-23-228-132.compute-1.amazonaws.com",
  //   "port": process.env.PORT || "5432",
  //   "dialect": "postgres",
  //   "logging": false
  // }
}
