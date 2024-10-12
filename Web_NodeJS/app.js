const express = require("express");
const app = express();

app.locals.baseURL = "http://localhost:4000"
//setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  //res.send("Chào mừng trang chủ");
  res.render('index',  {title:'Trang quản trị'})
});

app.get("/cambien", (req, res) => {
  res.render('cambien/index',  {title:'Trang cảm biến'})
});

app.get("/cambien/:id", (req, res) => {
    _id = req.query.id;
  res.render('cambien/update', {id:_id, title:'Cập nhật cảm biến'})
});

app.get("/dang-nhap", (req, res) => {
    res.render("login");
});


app.listen(4000, () => {
  console.log("Server web đang chạy ở port 4000");
});
