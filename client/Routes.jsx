import React from "react";

import ExitFrame from "./ExitFrame";
import Index from "./pages/Index";
import DebugIndex from "./pages/debug";
import BillingAPI from "./pages/debug/billing";
import GetData from "./pages/debug/data";
import ActiveWebhooks from "./pages/debug/webhooks";

const routes = {
  "/": () => <Index />,
  "/exitframe": () => <ExitFrame />,
  "/exitframe/:shop": ({ shop }) => <ExitFrame shop={shop} />,
  "/debug": () => <DebugIndex />,
  "/debug/webhooks": () => <ActiveWebhooks />,
  "/debug/billing": () => <BillingAPI />,
  "/debug/data": () => <GetData />,

  //Add your routes here
};

export default routes;
