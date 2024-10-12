const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {});
var i = 0;

app.locals.baseURL = "http://localhost:3000"
//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("connected");
});

app.get("/stop", (req, res) => {    
    io.emit("SEN01", "CMD01");//Ra lệnh dừng nhận dữ liệu

  //["SEN01", "CMD01"]

    res.sendStatus(200);
});

app.get("/start", (req, res) => {    
  io.emit("SEN01", "CMD02");//Mở nhận dữ liệu
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  //res.send("Chào mừng trang chủ");
  res.render('index',  {title:'Trang quản trị'});
});

app.get("/cambien", (req, res) => {
  res.render('cambien/index',  {title:'Trang cảm biến'});
});

app.get("/cambien/:id", (req, res) => {
    _id = req.query.id;
  res.render('cambien/update', {id:_id, title:'Cập nhật cảm biến'});
});

httpServer.listen(3000);
