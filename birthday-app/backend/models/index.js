const dbConfig = require("../config/db.config.js")
const mongoose = require('mongoose');
//const connection = mongoose.connection;

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.bd_url = dbConfig.birthday_url;
db.u_url = dbConfig.user_url;

db.birthday = require("./birthday.model.js");
db.user = require("./user.model.js");

module.exports = db;