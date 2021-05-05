const express = require("express");
const app = express();
const port = 5000;

const User = require("./models/User");

const mongoose = require("mongoose");
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://sjd813:wjdeh123@cluster0.2cyuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
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
app.listen(port, () => console.log(`Example app listening on port ${port}`));
