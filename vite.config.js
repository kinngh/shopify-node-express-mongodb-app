//MARK:- Config is broken. Doesn't allow for middlewares to work.
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

const PORT = process.env.PORT || 8081;
const HOST = process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "");
const proxyConfig = {
  target: `https://${HOST}`,
  changeOrigin: false,
  ws: false,
};

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    appOrigin: JSON.stringify(HOST),
  },
  server: {
    host: "localhost",
    port: PORT,
    hmr: {
      protocol: "wss",
      host: HOST,
      port: process.env.PORT,
      clientPort: 443,
    },
    proxy: {
      "/apps": proxyConfig,
      "/api": proxyConfig,
      "/proxy_route": proxyConfig,
      //"^/(\\?.*)?$": proxyConfig,
      //"^/apps(/|(\\?.*)?$)": proxyConfig,
    },
  },
  build: {
    outDir: "dist/",
  },
});
