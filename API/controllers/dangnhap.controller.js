const db = require("../models");
const DangNhap = db.dangnhap;  // Assuming 'dangnhap' is your login model in the db models
const bcrypt = require("bcryptjs");

// Login a user
exports.login = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password cannot be empty!" });
  }

  // Find user by email
  DangNhap.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found with email " + req.body.email });
      }

      // Compare hashed passwords
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid password!"
        });
      }

      res.send({ message: "Login successful", user: user });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving user with email=" + req.body.email
      });
    });
};

// Register a new user
exports.register = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Email and password cannot be empty!" });
  }

  // Create a new user
  const newUser = new DangNhap({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)  // Hashing the password before saving it to the database
  });

  // Save the user in the database
  newUser.save()
    .then(data => {
      res.send({ message: "User registered successfully", data });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "An error occurred while registering the user."
      });
    });
};

// Update a user's information
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!"
    });
  }

  const id = req.params.id;

  DangNhap.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`
        });
      }
      res.send({ message: "User was updated successfully.", data: user });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user by id
exports.delete = (req, res) => {
  const id = req.params.id;

  DangNhap.findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
      res.send({
        message: "User was deleted successfully!"
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};
