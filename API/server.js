const express = require("express");
const cors = require("cors");

    const app = express();
    var corsOptions ={};
    app.use(cors(corsOptions));

    //Khai báo DB
    const db = require("./models");
    db.mongoose
      .connect(db.url, {})
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
      });

    // parse requests of content-type - application/json
    app.use(express.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    // simple route
    app.get("/", (req, res) => {
      res.json({ message: "Chào mừng đến API cảm biến!" });
    });
    
    //Khai báo routes cho các API
    require("./routes/cambien.route")(app);

    // set port, listen for requests
    const PORT = 8282;
    app.listen(PORT, () => {
      console.log(`Server API is running on port ${PORT}.`);
    });
