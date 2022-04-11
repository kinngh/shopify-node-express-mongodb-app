const gdprRoutes = require("express").Router();

gdprRoutes.post("/gdpr/customers_data_request", async (req, res) => {
  /*
    Payload
    {
    shop_id: 954889,
    shop_domain: "snowdevil.myshopify.com",
    orders_requested: [299938, 280263, 220458],
    customer: {
        id: 191167,
        email: "john@email.com",
        phone: "555-625-1199",
    },
    data_request: {
        id: 9999,
    },
    };
*/
  console.log("---> GDPR request for Customer data request");
  res.status(200).send("Route processed");
});

gdprRoutes.post("/gdpr/customer_redact", async (req, res) => {
  /*
    Payload
    {
    shop_id: 954889,
    shop_domain: "snowdevil.myshopify.com",
    customer: {
        id: 191167,
        email: "john@email.com",
        phone: "555-625-1199",
    },
    orders_to_redact: [299938, 280263, 220458],
    };
*/

  console.log("---> GDPR request for Customer redact");
  res.status(200).send("Route processed");
});

gdprRoutes.post("/gdpr/shop_redact", async (req, res) => {
  /*
    Payload
    {
    shop_id: 954889,
    shop_domain: "snowdevil.myshopify.com",
    };
*/

  console.log("---> GDPR request for Shop redact");
  res.status(200).send("Route processed");
});

module.exports = gdprRoutes;
