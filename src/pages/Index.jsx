import React from "react";
import { Page, Card, Layout } from "@shopify/polaris";
import { navigate } from "raviger";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";

const HomePage = () => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  fullscreen.dispatch(Fullscreen.Action.EXIT);
  return (
    <React.Fragment>
      <Page title="Debug Cards">
        <Layout>
          <Layout.Section>
            <Card
              title="Fullscreen UI"
              sectioned
              primaryFooterAction={{
                content: "Go Fullscreen",
                onAction: () => {
                  fullscreen.dispatch(Fullscreen.Action.ENTER);
                  navigate("/fullscreen");
                },
              }}
            >
              <p>Grab data from an Express route in React</p>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card
              title="Making API Calls"
              sectioned
              primaryFooterAction={{
                content: "Get Data",
                onAction: () => {
                  navigate("/getData");
                },
              }}
            >
              <p>Grab data from an Express route in React</p>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card
              title="Subcribe Merchant"
              sectioned
              primaryFooterAction={{
                content: "Subscribe",
                onAction: () => {
                  navigate("/subscribe-server");
                },
              }}
            >
              <p>Subscribe your merchant to a recurring subscription plan.</p>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card
              title="Active Subscriptions"
              sectioned
              primaryFooterAction={{
                content: "View",
                onAction: () => {
                  navigate("/activeSubscriptions");
                },
              }}
            >
              <p>View currently active subscriptions for your app.</p>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card
              title="Registered Webhooks"
              sectioned
              primaryFooterAction={{
                content: "Webhooks",
                onAction: () => {
                  navigate("/activeWebhooks");
                },
              }}
            >
              <p>Check for registered webhooks and their relative paths.</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </React.Fragment>
  );
};

export default HomePage;
