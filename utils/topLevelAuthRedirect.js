const topLevelAuthRedirect = ({ apiKey, hostName, shop, host }) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/@shopify/app-bridge@2"></script>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        if (window.top === window.self) {
          window.location.href = '/auth?shop=${shop}&host=${host}';
        } else {
          var AppBridge = window['app-bridge'];
          var createApp = AppBridge.default;
          var Redirect = AppBridge.actions.Redirect;

          const app = createApp({
            apiKey: '${apiKey}',
            shopOrigin: '${shop}',
            host: '${host}',
          });

          const redirect = Redirect.create(app);

          redirect.dispatch(
            Redirect.Action.REMOTE,
            'https://${hostName}/auth/toplevel?shop=${shop}&host=${host}',
          );
        }
      });
    </script>
  </head>
  <body></body>
</html>`;
};

module.exports = topLevelAuthRedirect;
