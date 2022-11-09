import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Card, Layout, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";

const ServerSideRecurringSubscriptions = () => {
  const [responseData, setResponseData] = useState("");
  const app = useAppBridge();
  const fetch = useFetch();
  const redirect = Redirect.create(app);

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("api/recurringSubscription"); //fetch instance of useFetch()
    const data = await res.json();
    if (data.error) {
      setResponseData(data.error);
    } else if (data.confirmationUrl) {
      setResponseData("Redirecting");
      const { confirmationUrl } = data;
      redirect.dispatch(Redirect.Action.REMOTE, confirmationUrl);
    }
  }

  return (
    <Page
      title="Subscribe Merchant"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
    >
      <Layout>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Subscribe merchant",
              onAction: () => {
                fetchContent();
              },
            }}
          >
            <p>
              Subscribe your merchant to a test $10.25 plan and redirect to your
              home page.
            </p>

            {
              /* If we have an error, it'll pop up here. */
              responseData && <p>{responseData}</p>
            }
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ServerSideRecurringSubscriptions;
