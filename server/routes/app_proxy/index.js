import { Router } from "express";
const proxyRouter = Router();

proxyRouter.get("/json", (req, res) => {
  const jsonObject = { content: "proxy be working" };
  res.send(jsonObject);
});

export default proxyRouter;
