var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DiagramSchema = new Schema({
  diagramName: { type: String, required: true, maxLength: 100 },
  creationDate: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  classes: Object,
});

// Virtual for author's URL
DiagramSchema.virtual("url").get(function () {
  return "/api/diagrams/" + this._id;
});

//Export model
module.exports = mongoose.model("Diagram", DiagramSchema);
