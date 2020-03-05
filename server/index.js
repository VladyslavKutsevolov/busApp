const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const routes = require("./router/api/routes");
app.use("/api/routes/", routes);

app.listen(PORT, () =>
  console.log(`listening on port..... http://127.0.0.1:${PORT}`)
);
