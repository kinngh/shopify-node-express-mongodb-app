import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import { useEffect } from "react";
import routes from "./Routes";
import webVitalsTracker from "./components/functions/webVitalsTracker";
import AppBridgeProvider from "./providers/AppBridgeProvider";

export default function App() {
  const RouteComponents = useRoutes(routes);
  useEffect(() => {
    window?.shopify?.webVitals?.onReport(webVitalsTracker);
  }, []);

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider>
        <ui-nav-menu>
          <a href="/debug/data">Fetch Data</a>
          <a href="/debug/billing">Billing API</a>
        </ui-nav-menu>
        {RouteComponents}
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
