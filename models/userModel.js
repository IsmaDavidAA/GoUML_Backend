var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var async = require("async");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  creationDate: { type: Date },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});
UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

//Export model
module.exports = mongoose.model("User", UserSchema);
