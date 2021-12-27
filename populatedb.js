import Role from "./src/models/rolesModel";
import User from "./src/models/userModel";
import bcrypt from "bcryptjs";
import async from "async";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ roleName: "user" }).save(),
      new Role({ roleName: "moderator" }).save(),
      new Role({ roleName: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ roleName: { $in: ["admin", "moderator"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      userName: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log("Admin User Created!");
  }
};
