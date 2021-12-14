const { google } = require("googleapis");
const fs = require('fs');

const token = process.env.REFRESH_TOKEN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uris = ['http://localhost'];

const loadClient = () => {
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

  auth.setCredentials({ refresh_token: token });
  google.options({ auth });
};

module.exports = {
  loadClient
}