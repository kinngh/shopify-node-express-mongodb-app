import React from "react";
import { Page, Card, DataTable, Button } from "@shopify/polaris";
import { useQuery, gql } from "@apollo/client";
import { navigate } from "hookrouter";

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

  let rows = [];

  if (loading) {
    console.log("loading", loading);
  }
  if (data) {
    console.log("Rendering Data");
    Object.entries(data.webhookSubscriptions.edges).map(([key, value]) => {
      const { topic, callbackUrl } = value.node;
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

//0.node.callbackUrl / topic
const WebhookDataComponent = (caalbackUrl, topic) => {
  return <React.Fragment></React.Fragment>;
};
