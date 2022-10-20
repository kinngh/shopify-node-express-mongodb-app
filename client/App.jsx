import {
  NavigationMenu,
  Provider as AppBridgeProvider,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import { useRoutes } from "raviger";
import routes from "./GlobalRoutes";

// MARK:- Handle app bridge config persistence better
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
          ]}
        />
        {RouteComponents}
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

// MARK:- Apollo is being thrown out for a better hook
// function MyProvider({ children }) {
//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// }

//Convert this into a hook 
export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
