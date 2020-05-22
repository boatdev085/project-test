const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./router/router");
const app = express();
const db = require("./model/index");
const port = process.env.PORT || 3005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(express.static("build"));
db.sequelize
  .sync
  // { force: true }
  ();
//   .catch((e) => console.log("e", e));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});
app.listen(port);

console.log("App is listening on port " + port);
