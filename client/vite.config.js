import react from "@vitejs/plugin-react";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    appOrigin: JSON.stringify(
      process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "")
    ),
    SHOPIFY_API_OPTIONAL_SCOPES: JSON.stringify(
      process?.env?.SHOPIFY_API_OPTIONAL_SCOPES
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
    allowedHosts: [`${process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "")}`],
    cors: false,
  },
});
