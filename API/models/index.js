const dbConfig = require("../config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.cambien = require("./cambien.model.js")(mongoose);
module.exports = db;
