var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  creationDate: { type: Date },
});

// Virtual for author's URL
UserSchema.virtual("url").get(function () {
  return "/api/users/" + this._id;
});

//Export model
module.exports = mongoose.model("User", UserSchema);
