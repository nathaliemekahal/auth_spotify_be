const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: {
    type: String,
    // validate: {
    //   validator: async (e) => {
    //     let emails = await userModel.find({ email: e });
    //     if (emails.length || !isEmail(e)) {
    //       return false;
    //     } else return true;
    //   },
    //   message: "Check your email",
    // },
  },
  password: { type: String },
  googleId: { type: String },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

userSchema.statics.findByCred = async (email, password) => {
  const user = await userModel.findOne({ email });
  const doesMatch = await bcrypt.compare(password, user.password);
  console.log(doesMatch);
  if (!doesMatch) {
    const err = new Error("Unable to login");
    err.httpStatusCode = 401;
    throw err;
  }
  return user;
};

const userModel = model("users", userSchema);

module.exports = userModel;
