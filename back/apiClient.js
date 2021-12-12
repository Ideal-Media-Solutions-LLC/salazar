const { google } = require("googleapis");

const token = process.env.REFRESH_TOKEN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_url = "localhost:3001";

const loadClient = () => {
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_url);

  auth.setCredentials({ refresh_token: token });
  google.options({ auth });
};

const makeApiCall = () => {
  const calendar = google.calendar({ version: "v3" });
};