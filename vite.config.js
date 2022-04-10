import react from "@vitejs/plugin-react";
import "dotenv/config";

export default {
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    appOrigin: JSON.stringify(
      process.env.SHOPIFY_APP_URL.replace(/https:\/\//, "")
    ),
  },
  plugins: [react()],
};
