/*
  Based on the Redis example from shopify-node-api [Accessed: April 5, 2022]
  https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md

  The reason why session.isActive() was breaking because while the session works with a JS Object, it expects a Session object instead.
  In `loadCallback`, we fetch the session object, decrypt it and convert it into a Session object before returning, fixing our problem.
  
*/

import { Shopify } from "@shopify/shopify-api";
import { Session } from "@shopify/shopify-api/dist/auth/session/session.js";
import Cryptr from "cryptr";
import SessionModel from "./models/SessionModel.js";
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

const storeCallback = async (session) => {
  const result = await SessionModel.findOne({ id: session.id });

  if (result === null) {
    await SessionModel.create({
      id: session.id,
      content: cryption.encrypt(JSON.stringify(session)),
      shop: session.shop,
    });
  } else {
    await SessionModel.findOneAndUpdate(
      { id: session.id },
      {
        content: cryption.encrypt(JSON.stringify(session)),
        shop: session.shop,
      }
    );
  }

  return true;
};

const loadCallback = async (id) => {
  const sessionResult = await SessionModel.findOne({ id });
  if (sessionResult === null) {
    return undefined;
  }
  if (sessionResult.content.length > 0) {
    const sessionObj = JSON.parse(cryption.decrypt(sessionResult.content));
    return Session.cloneSession(sessionObj, sessionObj.id);
  }
  return undefined;
};

const deleteCallback = async (id) => {
  await SessionModel.deleteMany({ id });
  return true;
};

const sessionStorage = new Shopify.Session.CustomSessionStorage(
  storeCallback,
  loadCallback,
  deleteCallback
);

export default sessionStorage;
