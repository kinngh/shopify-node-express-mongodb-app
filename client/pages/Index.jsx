import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const HomePage = () => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  fullscreen.dispatch(Fullscreen.Action.EXIT);
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            title="Webhooks"
            primaryFooterAction={{
              content: "Explore",
              onAction: () => {
                navigate("/activeWebhooks");
              },
            }}
          >
            <p>Explore registered webhooks and endpoints.</p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card
            sectioned
            title="Data Fetching"
            primaryFooterAction={{
              content: "Explore",
              onAction: () => {
                navigate("/getData");
              },
            }}
          >
            <p>
              Run GET and POST requests to your server along with GraphQL
              queries.
            </p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card
            sectioned
            title="Billing API"
            primaryFooterAction={{
              content: "Cha-Ching",
              onAction: () => {
                navigate("/billing");
              },
            }}
          >
            <p>Subscribe merchant to a plan and explore existing plans.</p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card
            sectioned
            title="Fullscreen Editor"
            primaryFooterAction={{
              content: "Explore",
              onAction: () => {
                fullscreen.dispatch(Fullscreen.Action.ENTER);
                navigate("/fullscreen");
              },
            }}
          >
            <p>Enter Fullscreen mode.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default HomePage;
