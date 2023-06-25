import { Loading, useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useEffect } from "react";

const ExitFrame = (props) => {
  const app = useAppBridge();

  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    let redirectUri = params.get("redirectUri");
    if (props.shop) {
      redirectUri = `https://${appOrigin}/auth?shop=${props.shop}`;
    }
    const redirect = Redirect.create(app);

    redirect.dispatch(Redirect.Action.REMOTE, decodeURIComponent(redirectUri));
  }, [app]);

  return <Loading />;
};

export default ExitFrame;
