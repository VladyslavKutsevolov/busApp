const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
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
const routes = require("./routes/api/routes");
const posts = require("./routes/api/posts");
app.use("/api/posts", posts);
app.use("/api/routes", routes);

app.listen(PORT, () =>
  console.log(`listening on port..... http://127.0.0.1:${PORT}`)
);
