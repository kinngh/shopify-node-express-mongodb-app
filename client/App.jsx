import { AppProvider as PolarisProvider } from "@shopify/polaris";
import { NavMenu } from '@shopify/app-bridge-react';
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import routes from "./Routes";
import AppBridgeProvider from "./providers/AppBridgeProvider";

export default function App() {
  const RouteComponents = useRoutes(routes);

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider>
        <NavMenu>
          <a href="/debug/data">Fetch Data</a>
          <a href="/debug/billing">Billing API</a>
        </NavMenu>
        {RouteComponents}
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
