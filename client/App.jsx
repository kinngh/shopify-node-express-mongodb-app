import {
  NavigationMenu,
  Provider as AppBridgeProvider,
} from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { useRoutes } from "raviger";
import ApolloClientProvider from "./providers/ApolloClientProvider";
import routes from "./Routes";

const appBridgeConfig = {
  apiKey: process.env.SHOPIFY_API_KEY,
  host: new URL(location).searchParams.get("host"),
  forceRedirect: true,
};

export default function App() {
  const RouteComponents = useRoutes(routes);

  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider config={appBridgeConfig}>
        <NavigationMenu
          navigationLinks={[
            {
              label: "Debug Cards",
              destination: "/debug",
            },
          ]}
        />
        <ApolloClientProvider>{RouteComponents}</ApolloClientProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
