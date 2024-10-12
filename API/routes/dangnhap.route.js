module.exports = app => {
  // Import the necessary controllers
  const authController = require("../controllers/dangnhap.controller.js"); // Fixed the path and typo

  // Import middleware for authentication
  const authMiddleware = require("../middleware/auth.middleware.js");

  var router = require("express").Router();

  // Login
  router.post("/login", authController.login);

  // Register
  router.post("/register", authController.register);

  // Logout
  router.post("/logout", authMiddleware.authenticateToken, authController.logout);

  // Change password
  router.post("/change-password", authMiddleware.authenticateToken, authController.changePassword);

  // Attach the router to the '/api/auth' path
  app.use('/api/auth', router);
};
