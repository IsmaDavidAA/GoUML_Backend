var Course = require("../models/courseModel");

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.course_get_all = function (req, res, next) {
  Course.find({}, function (err, courses) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Courses retrieved successfully",
      data: courses,
    });
  });
};

exports.course_get_by_id = function (req, res, next) {
  Course.findById(req.params.courseId, function (err, course) {
    if (err) {
      res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({
      message: "Course retrieved successfully",
      data: course,
    });
  });
};

exports.course_post = [
  //validate the request
  body("courseName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Course name must be specified."),
  body("courseDescription")
    .notEmpty()
    .withMessage("Course description must be specified."),

  //process the request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Course object with escaped and trimmed data.
    var course = new Course({
      courseName: req.body.courseName,
      courseDescription: req.body.courseDescription,
      creationDate: Date.now(),
    });
    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
      });
    }
  },
];