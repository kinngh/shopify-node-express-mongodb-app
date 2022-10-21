import React, { useEffect, useState } from "react";
import { navigate } from "raviger";
import { Page, Card, Layout } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

const GetData = () => {
  const [responseData, setResponseData] = useState("");
  const [responseDataPost, setResponseDataPost] = useState("");
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("/apps/api"); //fetch instance of userLoggedInFetch(app)
    const { text } = await res.json();
    setResponseData(text);
  }
  async function fetchContentPost() {
    setResponseDataPost("loading...");
    const postBody = JSON.stringify({ content: "Body of POST request" });
    const res = await fetch("/apps/api", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: postBody,
    }); //fetch instance of userLoggedInFetch(app)

    const { content } = await res.json();
    setResponseDataPost(content);
  }

  async function fetchContentGQL() {
    setResponseDataGQL("loading...");
    const res = await fetch("/apps/api/gql"); //fetch instance of userLoggedInFetch(app)
    const response = await res.json();
    setResponseDataGQL(response.body.data.shop.name);
  }

  useEffect(() => {
    fetchContent();
    fetchContentPost();
    fetchContentGQL();
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
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Refetch",
              onAction: () => {
                fetchContentPost();
              },
            }}
          >
            <p>POST "/apps/api" is : {responseDataPost}</p>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card
            sectioned
            primaryFooterAction={{
              content: "Refetch GQL",
              onAction: () => {
                fetchContentGQL();
              },
            }}
          >
            <p>The data we get from "/apps/api/gql" is : {responseDataGQL}</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GetData;
