import React from "react";

import ExitFrame from "./ExitFrame";
import ActiveWebhooks from "./pages/ActiveWebhooks";
import FullScreen from "./pages/FullScreen";
import GetData from "./pages/GetData";
import Index from "./pages/Index";
import BillingAPI from "./pages/BillingAPI";

const routes = {
  "/": () => <Index />,
  "/exitframe": () => <ExitFrame />,
  "/activeWebhooks": () => <ActiveWebhooks />,
  "/getData": () => <GetData />,
  "/billing": () => <BillingAPI />,
  "/fullscreen": () => <FullScreen />,
};

export default routes;
