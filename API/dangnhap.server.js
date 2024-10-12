const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
// const bcrypt = require('bcryptjs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins, adjust as needed for security
    methods: ["GET", "POST"]
  }
});

var corsOptions = {
  origin: "http://example.com", // Adjust the origin as per your frontend
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// DB setup
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Authentication API!" });
});

// Authentication routes
require("./routes/dangnhap.route.js")(app);

// WebSocket handling for real-time user session management
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('login', (credentials) => {
    db.dangnhap.findOne({ email: credentials.email })
      .then(user => {
        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
          socket.emit('login_error', 'Invalid credentials');
        } else {
          socket.emit('login_success', { message: 'Logged in successfully', user: user });
        }
      })
      .catch(err => {
        socket.emit('login_error', err.message);
      });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Set port and start server
const PORT = 8383;
server.listen(PORT, () => {
  console.log(`Authentication server is running on port ${PORT}.`);
});
