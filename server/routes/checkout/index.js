import { Router } from "express";
const checkoutRoutes = Router();

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
checkoutRoutes.get("/", async (req, res) => {
  try {
    return res.status(200).send({ message: "It works!" });
  } catch (e) {
    console.error(`An error occured at /api/checkout`);
    return res.status(400).send({ error: true });
  }
});

export default checkoutRoutes;
