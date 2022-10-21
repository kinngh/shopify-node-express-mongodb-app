import React from "react";
import { Page, Card, DataTable } from "@shopify/polaris";
import { useQuery, gql } from "@apollo/client";
import { navigate } from "raviger";

const ActiveWebhooks = () => {
  const getInstalledWebhooks = gql`
    {
      webhookSubscriptions(first: 10) {
        edges {
          node {
            topic
            endpoint {
              __typename
              ... on WebhookHttpEndpoint {
                callbackUrl
              }
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getInstalledWebhooks);

  let rows = [];

  if (loading) {
    console.log("loading", loading);
  }
  if (data) {
    console.log("Rendering Data");
    Object.entries(data.webhookSubscriptions.edges).map(([key, value]) => {
      const topic = value.node.topic;
      const callbackUrl = value.node.endpoint.callbackUrl;
      rows.push([topic, callbackUrl]);
    });
  }

  if (error) {
    rows.push(["Error", "Check console for more info"]);
    console.log("error", error.message);
  }

  return (
    <Page
      title="Registered Webhooks"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
    >
      <Card>
        <DataTable
          columnContentTypes={["text", "text"]}
          headings={["Topic", "Callback Url"]}
          rows={rows}
        />
      </Card>
    </Page>
  );
};

export default ActiveWebhooks;
