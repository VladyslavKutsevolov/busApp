const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// parse application/json
app.use(bodyParser.json());

// connect mongoDb
const db = require("../client/config/database").database;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb connected...");
  })
  .catch(err => console.log(err));

// Express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// connect-flush middleware
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
// Route files
const routes = require("./routes/api/routes");
const posts = require("./routes/api/posts");
app.use("/api/posts", posts);
app.use("/api/routes", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`listening on port..... http://127.0.0.1:${PORT}`)
);
