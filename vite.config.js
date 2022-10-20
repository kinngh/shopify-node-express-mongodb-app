import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

const PORT = process.env.PORT || 8081;

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    appOrigin: JSON.stringify(process.env.SHOPIFY_APP_URL).replace(
      /https:\/\//,
      ""
    ),
  },
  server: {
    proxy: {
      "/apps": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      "/proxy_route": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist/",
  },
});
