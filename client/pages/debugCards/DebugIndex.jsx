import { useAppBridge } from "@shopify/app-bridge-react";
import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const DebugIndex = () => {
  const app = useAppBridge();
  return (
    <Page
      title="Debug Cards"
      subtitle="Interact and explore the current installation"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Webhooks"
            primaryFooterAction={{
              content: "Explore",
              onAction: () => {
                navigate("/debug/activeWebhooks");
              },
            }}
          >
            <p>Explore registered webhooks and endpoints.</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Data Fetching"
            primaryFooterAction={{
              content: "Explore",
              onAction: () => {
                navigate("/debug/getData");
              },
            }}
          >
            <p>
              Run GET and POST requests to your server along with GraphQL
              queries.
            </p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Billing API"
            primaryFooterAction={{
              content: "Cha-Ching",
              onAction: () => {
                navigate("/debug/billing");
              },
            }}
          >
            <p>Subscribe merchant to a plan and explore existing plans.</p>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            sectioned
            title="Dev Notes"
            primaryFooterAction={{
              content: "Let's go",
              onAction: () => {
                navigate("/debug/devNotes");
              },
            }}
          >
            <p>Notes for devs on expectations.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DebugIndex;
