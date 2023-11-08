import fs from 'fs'
import ngrok from 'ngrok'

const startNgrok = async () => {
  try {
    // Start Ngrok tunnel on a specific port
    const url = await ngrok.connect({
      addr: 5173, 
    });

    // Update SHOPIFY_APP_URL in .env file
    const envFilePath = '.env';
    const envContent = fs.readFileSync(envFilePath, 'utf8');
    const updatedEnvContent = envContent.replace(
      /SHOPIFY_APP_URL=.*/,
      `SHOPIFY_APP_URL=${url}`
    );
    fs.writeFileSync(envFilePath, updatedEnvContent);

    console.log(`Ngrok tunnel is running at: ${url}`);
  } catch (error) {
    console.error('Error starting Ngrok tunnel:', error);
  }
};

startNgrok();