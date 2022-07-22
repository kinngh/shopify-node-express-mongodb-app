/*
  Based on the Redis example from shopify-node-api [Accessed: April 5, 2022]
  https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md

  The reason why session.isActive() was breaking because while the session works with a JS Object, it expects a Session object instead.
  In `loadCallback`, we fetch the session object, decrypt it and convert it into a Session object before returning, fixing our problem.
  
*/

const SessionModel = require("./models/SessionModel.js");
const { Shopify } = require("@shopify/shopify-api");
const Cryptr = require("cryptr");
const {
  Session,
} = require("@shopify/shopify-api/dist/auth/session/session.js");
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

module.exports = sessionStorage;
