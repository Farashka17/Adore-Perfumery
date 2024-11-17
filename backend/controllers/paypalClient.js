import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// PayPal ortamı (sandbox veya live)
function environment() {
  const clientId = 'YOUR_CLIENT_ID';  // PayPal'dan aldığınız Client ID
  const clientSecret = 'YOUR_CLIENT_SECRET';  // PayPal'dan aldığınız Client Secret
  
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
}

// PayPal client oluşturma
function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

export default client;
