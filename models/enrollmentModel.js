var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var EnrollmentSchema = new Schema({
  userId: { type: String, required: true },
  courseId: { type: String, required: true },
  creationDate: { type: Date },
});

// Virtual for author's URL
EnrollmentSchema.virtual("url").get(function () {
  return "/api/enrollments/" + this._id;
});

//Export model
module.exports = mongoose.model("Enrollment", EnrollmentSchema);
