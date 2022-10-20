import { Router } from "express";
const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  res.json({ success: "It's working" });
});

module.exports = userRoutes;
