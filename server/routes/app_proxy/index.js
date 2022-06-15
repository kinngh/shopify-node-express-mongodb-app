const proxyRouter = require("express").Router();

proxyRouter.get("/json", (req, res) => {
  const jsonObject = { content: "proxy be working" };
  res.send(jsonObject);
});

module.exports = proxyRouter;
