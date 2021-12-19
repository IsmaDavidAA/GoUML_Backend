var Diagram = require("../models/diagramModel");

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.index = function (req, res) {
  async.parallel({}, function (err, results) {
    res.status(200).json({
      message: "Ok",
    });
  });
};

exports.diagram_post = [
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    var diagram = new Diagram({
      diagramName: req.body.diagramName,
      creationDate: Date.now(),
      classes: req.body.classes,
    });
    // diagram.id = req.params.id;
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
