const userRoutes = require("express").Router();

userRoutes.get("/app", (req, res) => {
  res.send("It do be working");
});

module.exports = userRoutes;
