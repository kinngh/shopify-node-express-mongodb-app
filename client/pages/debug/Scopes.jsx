import { Card, DataTable, Layout, Page, Text } from "@shopify/polaris";
import { useNavigate } from "raviger";
import { useEffect, useState } from "react";

const OptionalScopes = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  async function createRows() {
    const scopes = await window?.shopify?.scopes?.query();
    if (!scopes) return;

    const rows = [
      [<Text fontWeight="bold">Granted</Text>, scopes.granted.join(", ")],
      [<Text fontWeight="bold">Required</Text>, scopes.required.join(", ")],
      [<Text fontWeight="bold">Optional</Text>, scopes.optional.join(", ")],
    ];

    setRows(rows);
  }

  useEffect(() => {
    createRows();
  }, []);

  async function requestScopes() {
    setLoading(true);
    try {
      const response = await window?.shopify?.scopes?.request(
        SHOPIFY_API_OPTIONAL_SCOPES?.split(",") //this comes from vite
      );
      if (response?.result === "granted-all") {
        createRows();
      } else if (response?.result === "declined-all") {
        alert("Declined optional scopes");
      }
    } catch (e) {
      console.dir(e, { depth: null });
      alert(
        "Error occured while requesting scopes. Is the scope declared in your env?"
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Page
        title="Scopes"
        primaryAction={{
          content: "Request optional scopes",
          loading: loading,
          onAction: () => {
            requestScopes();
          },
        }}
        backAction={{
          onAction: () => {
            navigate("/debug");
          },
        }}
      >
        <Layout>
          <Layout.Section>
            <Card padding="0">
              <DataTable
                rows={rows}
                columnContentTypes={["text", "text"]}
                headings={[
                  <Text fontWeight="bold">Type</Text>,
                  <Text fontWeight="bold">Scopes</Text>,
                ]}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default OptionalScopes;
