const dbConfig = require("../config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require("./dangnhap.model.js")(mongoose); // Thay đổi tên model thành "User" cho phù hợp với đối tượng đăng nhập
module.exports = db;
