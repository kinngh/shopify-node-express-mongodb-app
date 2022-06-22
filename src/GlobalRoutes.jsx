import React from "react";

import Index from "./pages/Index";
import ActiveSubscriptions from "./pages/ActiveSubscriptions";
import RecurringSubscriptions from "./pages/RecurringSubscriptions";
import ActiveWebhooks from "./pages/ActiveWebhooks";
import GetData from "./pages/GetData";
import ServerSideRecurringSubscriptions from "./pages/ServerSideRecurringSubscriptions";
import FullScreen from "./pages/FullScreen";

const routes = {
  "/": () => <Index />,
  "/activeSubscriptions": () => <ActiveSubscriptions />,
  "/recurringSubscriptions": () => <RecurringSubscriptions />,
  "/activeWebhooks": () => <ActiveWebhooks />,
  "/getData": () => <GetData />,
  "/subscribe-server": () => <ServerSideRecurringSubscriptions />,
  "/fullscreen": () => <FullScreen />,
};

export default routes;
