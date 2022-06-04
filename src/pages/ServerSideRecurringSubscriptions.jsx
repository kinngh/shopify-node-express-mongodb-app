/**
 * Known bug:
 * While `npm run dev` if you make changes to this component, it causes the host to become null and crashes the React app.
 * This has no effect in production.
 */

import React, { useState } from "react";
import { navigate } from "hookrouter";
import { Page, Card, Layout } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import { Redirect } from "@shopify/app-bridge/actions";

const ServerSideRecurringSubscriptions = () => {
  const [responseData, setResponseData] = useState("");
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const redirect = Redirect.create(app);

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("/apps/api/recurringSubscription"); //fetch instance of userLoggedInFetch(app)
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
      title="Get data from Express route"
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
