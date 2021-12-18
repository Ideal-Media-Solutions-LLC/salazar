const { google } = require("googleapis");
const fs = require('fs');

const token = process.env.REFRESH_TOKEN;
const client_id = process.env.CLIENT_ID2;
const client_secret = process.env.CLIENT_SECRET2;
const redirect_uris = ["urn:ietf:wg:oauth:2.0:oob","https://localhost"];

const loadClient = () => {
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[1]);

  auth.setCredentials({ refresh_token: token });
  google.options({ auth });
};

module.exports = {
  loadClient
}