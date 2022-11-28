let mongoose = require('mongoose');
const db = require("../models/index");


const initClientDbConnection = (url) => {
  const db = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  db.once("open", function() {
    console.log("client MongoDB Connection ok!");
  });
  require("../models/birthday.model")
  return db;
};

module.exports = { initClientDbConnection };