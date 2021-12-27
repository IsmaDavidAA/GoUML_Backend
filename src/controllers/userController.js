var User = require("../models/userModel");

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.user_get_all = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
    });
  });
};

exports.user_get_by_id = function (req, res, next) {
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  });
};

exports.user_post = [
  //validate the request
  body("userName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("User name must be specified."),
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified."),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Password must be specified."),

  //process the request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a User object with escaped and trimmed data.
    var user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      creationDate: Date.now(),
    });
    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
      });
    }
    res.status(200).json({
      message: "User created successfully",
      data: user,
    });
  },
];

exports.user_put = [
  //validate the request
  body("userName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("User name must be specified."),
  body("email")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Email must be specified."),
  body("password")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Password must be specified."),
  //process the request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a User object with escaped and trimmed data.
    var user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      creationDate: Date.now(),
    });
    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  },
];

exports.user_delete = function (req, res, next) {
  User.findByIdAndRemove(req.params.userId, function (err, user) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: user,
    });
  });
};
