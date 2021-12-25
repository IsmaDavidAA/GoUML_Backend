var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  nameTask: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  courseId: { type: String, required: true },
  creationDate: { type: Date },
  classes: Object,
});

// Virtual for author's URL
TaskSchema.virtual("url").get(function () {
  return "/api/diagrams/" + this._id;
});

//Export model
module.exports = mongoose.model("Diagram", TaskSchema);
