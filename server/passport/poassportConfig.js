const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      function (email, password, done) {
        console.log(password);
        User.findOne({ email: email }, (err, user) => {
          if (err) return done(err);
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
      }
    )
  );
};
