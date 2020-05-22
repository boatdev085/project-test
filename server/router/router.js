const express = require("express");
const models = express.Router();
models.use("/user", require("../api/user"));
models.use("/province", require("../api/province"));

module.exports = models;
