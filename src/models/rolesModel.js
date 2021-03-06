var mongoose = require("mongoose");
var Schema = mongoose.Schema;

export const ROLES = ["student", "teacher", "admin"];

var RoleSchema = new Schema({
  roleName: { type: String, required: true, maxLength: 100 },
});

//Export model
module.exports = mongoose.model("Role", RoleSchema);
