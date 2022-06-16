/*
  This is left in JUST AS A DEMO. You should not run recurring subscriptions client side because the merchant can meddle with the code.
  Refer: server/routes/recurringSubscriptions.js
*/

import { Page, Card } from "@shopify/polaris";
import { useMutation, gql } from "@apollo/client";
import { navigate } from "raviger";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";

const shopOrigin = new URL(location).searchParams.get("shop");

const subscribeMerchantMutation = gql`
  mutation CreateSubscription(
    $returnString: URL!
    $planName: String!
    $planPrice: Decimal!
  ) {
    appSubscriptionCreate(
      name: $planName
      returnUrl: $returnString
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: $planPrice, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
        status
      }
    }
  }
`;
const RecurringSubscriptions = () => {
  const abContext = useAppBridge();
  const redirect = Redirect.create(abContext);
  const returnUrl = `https://${appOrigin}/auth?shop=${shopOrigin}`;

  const [subMerchant, { data, loading, error }] = useMutation(
    subscribeMerchantMutation
  );

  if (data) {
    redirect.dispatch(
      Redirect.Action.REMOTE,
      data.appSubscriptionCreate.confirmationUrl
    );
  }

  return (
    <Page
      title="Subscribe Merchant to $10 plan"
      breadcrumbs={[{ content: "Home", onAction: () => navigate("/") }]}
    >
      <Card
        sectioned
        primaryFooterAction={{
          content: "Subscribe",
          onAction: () => {
            subMerchant({
              variables: {
                returnString: returnUrl,
                planName: "Tester Plan",
                planPrice: 10.0,
              },
            });
          },
        }}
      >
        <p>
          Subscribe your merchant to a test $10 plan and redirect to your home
          page.
        </p>
      </Card>
    </Page>
  );
};

export default RecurringSubscriptions;
