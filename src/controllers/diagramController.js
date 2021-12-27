
var Diagram = require("../models/diagramModel");

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.diagram_get_all = [
  (req, res, next) => {
    Diagram.find({}, function (err, diagrams) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({
        message: "Diagrams retrieved successfully",
        data: diagrams,
      });
    });
  },
];

exports.diagram_get_by_id = [
  (req, res, next) => {
    Diagram.findById(req.params.diagramId, function (err, diagram) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({
        message: "Diagram retrieved successfully",
        data: diagram,
      });
    });
  },
];

exports.diagram_post = [
  //validate the request
  body("diagramName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Diagram name must be specified."),
  body("classes").notEmpty().withMessage("Classes must be specified."),
  //process the request
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var diagram = new Diagram({
      diagramName: req.body.diagramName,
      creationDate: Date.now(),
      classes: req.body.classes,
    });
    if (!errors.isEmpty()) {
      async.parallel(function (err, results) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          _id: diagram._id,
          diagramName: req.body.diagramName,
          creationDate: Date.now(),
          classes: req.body.classes,
          errors: errors.array(),
        });
      });
      return;
    } else {
      // Data from form is valid. Save book.
      diagram.save(function (err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new book record.
        res.status(200).json({
          _id: diagram._id,
          diagramName: req.body.diagramName,
          creationDate: Date.now(),
          classes: req.body.classes,
          errors: errors.array(),
        });
      });
    }
  },
];

exports.diagram_update_by_id = [
  //validate the request
  body("diagramName")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Diagram name must be specified."),
  body("classes").notEmpty().withMessage("Classes must be specified."),
  //process the request
  (req, res, next) => {
    const errors = validationResult(req);
    Diagram.findById(req.params.diagramId, function (err, diagram) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      diagram.diagramName = req.body.diagramName;
      diagram.creationDate = Date.now();
      diagram.classes = req.body.classes;
      diagram.save(function (err) {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          message: "Diagram updated successfully",
          data: diagram,
        });
      });
    });
  },
];

exports.diagram_delete_by_id = [
  (req, res, next) => {
    Diagram.findByIdAndRemove(req.params.diagramId, function (err, diagram) {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({
        message: "Diagram deleted successfully",
        data: diagram,
      });
    });
  },
];
