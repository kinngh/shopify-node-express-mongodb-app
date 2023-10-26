import {
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { navigate } from "raviger";

const DebugIndex = () => {
  return (
    <>
      <Page
        title="Debug Cards"
        subtitle="Interact and explore the current installation"
        backAction={{ content: "Home", onAction: () => navigate("/") }}
      >
        <Layout>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Webhooks
                </Text>
                <Text>Explored actively registered webhooks</Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/debug/webhooks");
                    }}
                  >
                    Explore
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Data Fetching
                </Text>
                <Text>
                  Send GET, POST and GraphQL queries to your app's backend.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/debug/data");
                    }}
                  >
                    Explore
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  Billing API
                </Text>
                <Text>
                  Subscribe merchant to a plan and explore existing plans.
                </Text>
                <InlineStack wrap={false} align="end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("/debug/billing");
                    }}
                  >
                    Cha-Ching
                  </Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf" />
        </Layout>
      </Page>
    </>
  );
};

export default DebugIndex;
