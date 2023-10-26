import { useEffect } from "react";
import {
  Card,
  Layout,
  Page,
  Spinner,
  Text,
  BlockStack,
} from "@shopify/polaris";

const ExitFrame = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const shop = window?.shopify?.config?.shop;
      open(`https://${appOrigin}/api/auth?shop=${shop}`, "_top");
    }
  }, []);

  return (
    <>
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="200">
                <Text variant="headingMd">Security Checkpoint</Text>
                <Text variant="bodyMd">Reauthorizing your tokens</Text>
                <Spinner />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default ExitFrame;
