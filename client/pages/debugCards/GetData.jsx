import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Layout, LegacyCard, Link, Page } from "@shopify/polaris";
import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const GetData = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [responseData, setResponseData] = useState("");
  const [responseDataPost, setResponseDataPost] = useState("");
  const [responseDataGQL, setResponseDataGQL] = useState("");
  const fetch = useFetch();

  async function fetchContent() {
    setResponseData("loading...");
    const res = await fetch("/api"); //fetch instance of useFetch()
    const { text } = await res.json();
    setResponseData(text);
  }
  async function fetchContentPost() {
    setResponseDataPost("loading...");
    const postBody = JSON.stringify({ content: "Body of POST request" });
    const res = await fetch("/api", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: postBody,
    }); //fetch instance of useFetch()

    const { content } = await res.json();
    setResponseDataPost(content);
  }

  async function fetchContentGQL() {
    setResponseDataGQL("loading...");
    const res = await fetch("/api/gql"); //fetch instance of useFetch()
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
      title="Data Fetching"
      backAction={{ content: "Home", onAction: () => navigate("/debug") }}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard
            sectioned
            primaryFooterAction={{
              content: "Refetch",
              onAction: () => {
                fetchContent();
              },
            }}
          >
            <p>
              GET <code>"/apps/api"</code>: {responseData}
            </p>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard
            sectioned
            primaryFooterAction={{
              content: "Refetch",
              onAction: () => {
                fetchContentPost();
              },
            }}
          >
            <p>
              POST <code>"/apps/api" </code>: {responseDataPost}
            </p>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard
            sectioned
            primaryFooterAction={{
              content: "Refetch",
              onAction: () => {
                fetchContentGQL();
              },
            }}
          >
            <p>
              GET <code>"/apps/api/gql"</code>: {responseDataGQL}
            </p>
          </LegacyCard>
          <LegacyCard title="Developer Notes">
            <LegacyCard.Section title="Making Requests">
              <li>
                Create a new route in <code>/server/routes</code> and add it to
                your <code>index.js</code> to expose it behind{" "}
                <code>verifyRequest</code>.
              </li>
              <li>
                Create a new instance of <code>useFetch()</code> and use that to
                make a request to <code>/api/your-route/goes-here/</code>
              </li>
              <li>
                [Optional] Use a library like{" "}
                <Link
                  onClick={() => {
                    redirect.dispatch(Redirect.Action.REMOTE, {
                      url: "https://tanstack.com/query/latest",
                      newContext: true,
                    });
                  }}
                >
                  <code>@tanstack/react-query</code>
                </Link>{" "}
                or{" "}
                <Link
                  onClick={() => {
                    redirect.dispatch(Redirect.Action.REMOTE, {
                      url: "https://swr.vercel.app",
                      newContext: true,
                    });
                  }}
                >
                  <code>swr</code>
                </Link>{" "}
                for client side data fetching state management.
              </li>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default GetData;
