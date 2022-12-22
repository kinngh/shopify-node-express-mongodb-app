import { gql, useQuery } from "@apollo/client";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Card, DataTable, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const ActiveWebhooks = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const getInstalledWebhooks = gql`
    {
      webhookSubscriptions(first: 25) {
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

  const { data: myShopifyDomain } = useQuery(
    gql`
      {
        shop {
          myshopifyDomain
        }
      }
    `
  );

  return (
    <Page
      title="Webhooks"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
    >
      <Card>
        <DataTable
          columnContentTypes={["text", "text"]}
          headings={["Topic", "Callback Url"]}
          rows={rows}
        />
      </Card>
      <Card
        title="Webhook URLs"
        sectioned
        // This is an extremely terrible implementation please do not do this
        primaryFooterAction={
          myShopifyDomain
            ? {
                content: "Reauth",
                onAction: () => {
                  redirect.dispatch(
                    Redirect.Action.REMOTE,
                    `https://${appOrigin}/auth?shop=${myShopifyDomain.shop.myshopifyDomain}`
                  );
                },
              }
            : { content: "Fetching data" }
        }
      >
        <p>
          Webhooks are registered when the app is installed, or when tokens are
          refetched by going through the authentication process. If your
          Callback URL isn't the same as your current URL (happens usually
          during dev when using ngrok), you need to go through the auth process
          again. Click on `reauth` to fix this.
        </p>
      </Card>
    </Page>
  );
};

export default ActiveWebhooks;
