import React from "react";

import Index from "./pages/Index";
import ActiveSubscriptions from "./pages/ActiveSubscriptions";
import RecurringSubscriptions from "./pages/RecurringSubscriptions";
import ActiveWebhooks from "./pages/ActiveWebhooks";
import GetData from "./pages/GetData";

const routes = {
  "/": () => <Index />,
  "/activeSubscriptions": () => <ActiveSubscriptions />,
  "/recurringSubscriptions": () => <RecurringSubscriptions />,
  "/activeWebhooks": () => <ActiveWebhooks />,
  "/getData": () => <GetData />,
};

export default routes;
