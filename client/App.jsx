import {
  NavigationMenu,
  Provider as AppBridgeProvider,
} from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import ApolloClientProvider from "./providers/ApolloClientProvider";

import { useRoutes } from "raviger";
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
              label: "Home",
              destination: "/",
            },
            {
              label: "Get Data",
              destination: "/getData",
            },
          ]}
        />
        <ApolloClientProvider>{RouteComponents}</ApolloClientProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

//MyProvider is now providers/ApolloProvider
//userLoggedInFetch() is now hooks/useFetch()
