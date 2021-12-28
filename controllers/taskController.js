var Task = require("../models/taskModel");

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.task_get_all = function (req, res, next) {
  Task.find({}, function (err, tasks) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  });
};

exports.task_get_by_id = function (req, res, next) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Task retrieved successfully",
      data: task,
    });
  });
};

exports.task_post = [
  //validate the request
  body("taskName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Task name must be specified."),
  body("taskDescription")
    .notEmpty()
    .withMessage("Task description must be specified."),

  //process the request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Task object with escaped and trimmed data.
    var task = new Task({
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      creationDate: Date.now(),
    });
    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: "Task created successfully",
          data: task,
        });
      });
    }
  },
];

exports.task_put = [
  //validate the request
  body("taskName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Task name must be specified."),
  body("taskDescription")
    .notEmpty()
    .withMessage("Task description must be specified."),
  //process the request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Task object with escaped and trimmed data.
    var task = new Task({
      taskName: req.body.taskName,
      taskDescription: req.body.taskDescription,
      creationDate: Date.now(),
    });
    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: "Task updated successfully",
          data: task,
        });
      });
    }
  },
];

exports.task_delete = function (req, res, next) {
  Task.findByIdAndRemove(req.params.taskId, function (err, task) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Task deleted successfully",
      data: task,
    });
  });
};

exports.task_get_all_in_a_course = function (req, res, next) {
  Task.find({ courseId: req.params.courseId }, function (err, tasks) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  });
};
