import React from "react";

import Index from "./pages/Index";
import ActiveSubscriptions from "./pages/ActiveSubscriptions";
import RecurringSubscriptions from "./pages/RecurringSubscriptions";

const routes = {
  "/": () => <Index />,
  "/activeSubscriptions": () => <ActiveSubscriptions />,
  "/recurringSubscriptions": () => <RecurringSubscriptions />,
};

export default routes;
