/*

To register webhook:
- Save as `server/webhooks/topic_name.js`
- In `server/index.js`, search for `//MARK:- Add handlers for webhooks here.` and add your handler.
- Done.
*/

const topicHandler = async (topic, shop, webhookRequestBody) => {
  console.log(`Process the ${topic} webhook for ${shop} here.`);
};

module.exports = topicHandler;
