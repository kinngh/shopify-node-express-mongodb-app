/*

  DEV ONLY
  `npm run update:url`

  It got really annoying having to update App URL and Redirect URLs manually everytime. Using the Partner API to update the URLs from here instead. 

  LIMITATION:
  - [OEM] Cannot update GDPR URLs.
  - [OEM] Cannot update App Proxy URL.
 */

import {
  api as cliAPI,
  error as cliError,
  ui as cliUI,
  session,
} from "@shopify/cli-kit";

import dotenv from "dotenv";
dotenv.config();

const selectOrg = async (accessToken) => {
  const orgs = await getOrgs(accessToken);
  const org = await selectOrgCLI(orgs);
  return org.id;
};

const getOrgs = async (accessToken) => {
  const response = await cliAPI.partners.request(
    cliAPI.graphql.AllOrganizationsQuery,
    accessToken
  );
  const orgs = response.organizations.nodes;
  if (orgs.length === 0) {
    return new error.Abort(
      `There was a problem connecting to the org. Please check that the org exists and/or you have access. You can logout using\n npm run shopify auth logout`
    );
  }
  return orgs;
};

const selectOrgCLI = async (orgs) => {
  if (orgs.length === 1) {
    return orgs[0];
  }
  const orgList = orgs.map((org) => ({
    name: org.businessName,
    value: org.id,
  }));

  const choice = await cliUI.prompt([
    {
      type: "autocomplete",
      name: "id",
      message: "Select a Shopify Partner org for this app",
      choices: orgList,
    },
  ]);

  return orgs.find((org) => org.id === choice.id);
};

const getApp = async (apiKey, accessToken) => {
  const response = await cliAPI.partners.request(
    cliAPI.graphql.FindAppQuery,
    accessToken,
    {
      apiKey,
    }
  );
  return response.app;
};
const updateDashboardURLs = async (apiKey, appUrl) => {
  const accessToken = await session.ensureAuthenticatedPartners();

  const variables = {
    apiKey,
    appUrl,
    redir: [`${appUrl}/auth/tokens`, `${appUrl}/auth/callback`],
  };

  const query = cliAPI.graphql.UpdateURLsQuery;
  const response = await cliAPI.partners.request(query, accessToken, variables);
  if (response.appUpdate.userErrors.length > 0) {
    const errors = response.appUpdate.userErrors
      .map((error) => error.message)
      .join(", ");
    throw new cliError.Abort(errors);
  }
};

const updateStuff = async () => {
  console.warn("--> This is for use in DEV mode only");
  console.log("--> Fetching Access Tokens");
  const accessToken = await session.ensureAuthenticatedPartners();
  console.log("--> Fetching Orgs");
  await selectOrg(accessToken);
  console.log("--> Fetching App Data");
  const app = await getApp(process.env.SHOPIFY_API_KEY, accessToken);
  console.log("--> Updating URLs");
  await updateDashboardURLs(app.apiKey, process.env.SHOPIFY_APP_URL);
  console.log(
    "--> URLs updated. Please update GDPR and Proxy routes manually."
  );
};

updateStuff();
