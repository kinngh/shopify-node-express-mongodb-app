/**
 * Known bug:
 * While `npm run dev` if you make changes to this component, it causes the host to become null and crashes the React app.
 * This has no effect in production.
 */

import React, { useEffect, useState } from "react";
import { navigate } from "hookrouter";
import { Page, Card, Layout } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

const GetData = () => {
  const [responseData, setResponseData] = useState("");
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("/apps/api"); //fetch instance of userLoggedInFetch(app) and not the regular fetchAPI that we're used to
    const { text } = await res.json();
    setResponseData(text);
  }

  useEffect(() => {
    fetchContent();
  }, []);

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
              content: "Refetch",
              onAction: () => {
                fetchContent();
              },
            }}
          >
            <p>The data we get from "/apps/api" is : {responseData}</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GetData;
