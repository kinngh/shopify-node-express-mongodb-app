import { Provider } from "@shopify/app-bridge-react";
import { Layout, Page, Spinner } from "@shopify/polaris";
import { useNavigate, usePath, useQueryParams } from "raviger";
import { useEffect, useMemo, useState } from "react";

function AppBridgeProvider({ children }) {
  const navigate = useNavigate();
  const location = usePath();
  const [query] = useQueryParams();

  const [appBridgeConfig, setConfig] = useState(null);

  useEffect(() => {
    const host = query?.host;

    if (host) {
      setConfig({
        host: host,
        apiKey: process.env.SHOPIFY_API_KEY,
        forceRedirect: true,
      });
    }
  }, []);

  const history = useMemo(
    () => ({
      replace: (path) => {
        navigate(path);
      },
    }),
    [location]
  );

  const routerConfig = useMemo(
    () => ({ history, location }),
    [history, location]
  );

  if (!appBridgeConfig) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Spinner />
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Provider config={appBridgeConfig} router={routerConfig}>
      {children}
    </Provider>
  );
}

export default AppBridgeProvider;
