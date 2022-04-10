import React from "react";
import { Page, Card, Layout } from "@shopify/polaris";
import { navigate } from "hookrouter";

const HomePage = () => {
  return (
    <React.Fragment>
      <Page>
        <Layout>
          <Layout.Section>
            <Card
              title="Susbcribe Merchant"
              sectioned
              primaryFooterAction={{
                content: "Subscribe",
                onAction: () => {
                  navigate("/recurringSubscriptions");
                },
              }}
            >
              <p>Subscribe your merchant to a recurring subscription plan</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </React.Fragment>
  );
};

export default HomePage;
