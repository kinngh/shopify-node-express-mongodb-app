import Index from "./pages/Index";
import ExitIframe from "./pages/ExitIframe";

const routes = {
  "/": () => <Index />,
  "/exitiframe": () => <ExitIframe />,
};

export default routes;