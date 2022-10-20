import { Router } from "express";
const proxyRouter = Router();

proxyRouter.get("/", (req, res) => {
  res.json({ success: "It's working" });
});

export default proxyRouter;
