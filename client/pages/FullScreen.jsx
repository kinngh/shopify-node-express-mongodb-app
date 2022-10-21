import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import {
  Layout,
  Page,
  Card,
  FullscreenBar,
  DisplayText,
  Button,
} from "@shopify/polaris";
import { navigate } from "raviger";
import React from "react";

const FullScreen = () => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  return (
    <Page>
      <FullscreenBar
        onAction={() => {
          fullscreen.dispatch(Fullscreen.Action.EXIT);
          navigate("/");
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          <DisplayText>Page Title</DisplayText>
          <Button onClick={() => alert("Button is pressed")}>Button</Button>
        </div>
      </FullscreenBar>
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
            <p>
              Using the{" "}
              <code>&lt;FullscreenBar&gt;...&lt;/FullscreenBar&gt;</code> is
              required when using Fullscreen mode.
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default FullScreen;
