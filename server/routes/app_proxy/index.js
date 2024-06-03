import { Router } from "express";
import clientProvider from "../../../utils/clientProvider.js";
const proxyRouter = Router();

proxyRouter.get("/json", async (req, res) => {
  try {
    const { client } = await clientProvider.offline.graphqlClient({
      shop: res.locals.user_shop,
    });
    return res.status(200).send({ content: "Proxy Be Working" });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
});

export default proxyRouter;
