require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.DB_PORT,
    "dialect": "mysql"
  }
};
