import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, Loading } from "@shopify/app-bridge-react";
import { useEffect } from "react";

const ExitFrame = () => {
  const app = useAppBridge();

  useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    const redirectUri = params.get("redirectUri");
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.REMOTE, decodeURIComponent(redirectUri));
  }, [app]);

  return <Loading />;
};

export default ExitFrame;
