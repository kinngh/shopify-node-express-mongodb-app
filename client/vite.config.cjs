import react from "@vitejs/plugin-react";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const PORT = process.env.PORT || 8081;
const VitePort = 5173;

const proxyOptions = {
  target: `http://127.0.0.1:${PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};
const host = process.env.SHOPIFY_APP_URL
  ? process.env.SHOPIFY_APP_URL.replace(/https?:\/\//, "")
  : "localhost";
let hmrConfig;
if (host === "localhost") {
  hmrConfig = {
    protocol: "ws",
    host: "localhost",
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: "wss",
    host: host,
    port: VitePort,
    clientPort: 443,
  };
}

export default defineConfig({
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    appOrigin: JSON.stringify(
      process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "")
    ),
  },
  plugins: [react()],
  build: {
    outDir: "../dist/client/",
  },
  root: dirname(fileURLToPath(import.meta.url)),
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: "localhost",
    port: VitePort,
    hmr: hmrConfig,
    proxy: {
      // Routes are kept separate on purpose
      "^/auth(/|(\\?.*)?$)": proxyOptions,
      "^/apps(/|(\\?.*)?$)": proxyOptions,
      "^/proxy_route(/|(\\?.*)?$)": proxyOptions,
      "^/graphql(/|(\\?.*)?$)": proxyOptions,
      "^/webhooks(/|(\\?.*)?$)": proxyOptions,
      "^/gdpr(/|(\\?.*)?$)": proxyOptions,
    },
  },
});

// proxy routes ARE clumsy, but a future update will refactor into a single route
// like /apps/* so everything works as expected.
// I am working on `create-shop-app` project anyways where I deal with this
// so just 🐻 with me on this, but it's production ready, so don't worry about this
// On a future date I'll push out a migration guide because the entire structure will change
// to make the developer experience better.
// https://github.com/kinngh/create-shop-app
