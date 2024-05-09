export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'f8871534-f5f9-4187-93be-7cc4fec72db9',
      authority: 'https://login.microsoftonline.com/0690cba8-a3a0-4aab-885f-27112ca1cb7e',
    }
  },
  apiConfig: {
    scopes: ['openid profile email'],
    uri: 'http://localhost:4200/'
  },
  adminRole: "ADMIN",
  appName: 'Banco W',
  baseUrl: 'https://localhost:7244/api/',
};
