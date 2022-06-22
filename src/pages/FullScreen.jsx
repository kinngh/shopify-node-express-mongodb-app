import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { Layout, Page, Card } from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const FullScreen = () => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  return (
    <Page
      title="Fullscreen"
      breadcrumbs={[
        {
          content: "Home",
          onAction: () => {
            fullscreen.dispatch(Fullscreen.Action.EXIT);
            navigate("/");
          },
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card
            title="F U L L S C R E E N"
            sectioned
            primaryFooterAction={{
              content: "Home",
              onAction: () => {
                fullscreen.dispatch(Fullscreen.Action.EXIT);
                navigate("/");
              },
            }}
          >
            <p>Grab data from an Express route in React</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FullScreen;
