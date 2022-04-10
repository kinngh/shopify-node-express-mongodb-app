import React from "react";
import { Page, Card, Layout, Button } from "@shopify/polaris";
import { useQuery, gql } from "@apollo/client";

const ActiveWebhooks = () => {
  const getInstalledWebhooks = gql`
    {
      webhookSubscriptions(first: 10) {
        edges {
          node {
            id
            callbackUrl
            createdAt
            endpoint {
              ... on WebhookHttpEndpoint {
                __typename
              }
            }
            format
            topic
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getInstalledWebhooks);

  if (loading) {
    console.log("loading", loading);
  }
  if (data) {
    console.log("data");
    console.log(data);
  }

  if (error) {
    console.log("error", error.message);
  }

  return (
    <React.Fragment>
      <Page>
        <Layout>
          <Layout.Section>
            <Card title="Getting webhook subscriptions" sectioned>
              <p>Check console</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </React.Fragment>
  );
};

export default ActiveWebhooks;
