const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      maxlength: 100,
    },
    lastname: {
      type: String,
      maxlength: 50,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: String,
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, saltRounds)
      .then((hash) => {
        console.log(user.password);
        console.log(hash);

        user.password = hash;

        console.log(user.password);
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
