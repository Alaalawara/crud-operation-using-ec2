require('dotenv')
.config()
module.exports = {
  "development": {
    "username": "admin",
    "password": "adminadmin",
    "database": "crud",
    "host": "atlas-dev.c4wfursnjbor.ap-south-1.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}