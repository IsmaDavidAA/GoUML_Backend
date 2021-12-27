var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  nameCourse: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 500 },
  teacherId: { type: String, required: true },
  creationDate: { type: Date },
});

// Virtual for author's URL
CourseSchema.virtual("url").get(function () {
  return "/api/courses/" + this._id;
});

//Export model
module.exports = mongoose.model("Course", CourseSchema);
