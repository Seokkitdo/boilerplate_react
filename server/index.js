const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");
const User = require("./models/User");

const mongoose = require("mongoose");
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
require("./passport/poassportConfig")(passport);
app.use(express.json());
mongoose
  .connect(config.mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.send("No User Exists");
    req.login(user, (err) => {
      if (err) return next(err);
      return res.send("Successfully Authenticated");
      console.log(req.user);
    });
  })(req, res, next);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
