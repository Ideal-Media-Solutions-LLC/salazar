const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
//const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const SCOPES = [`https://www.googleapis.com/auth/calendar.events`];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
let appAuth;
// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  // authorize(JSON.parse(content), createEvent);
  // authorize(JSON.parse(content), listEvents);
  appAuth = JSON.parse(content);
});
//modules.exports = {getList, }
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// WHEN SITEWIDE / PASS THE USER TOKEN HERE ....function authorize(userToken, callback) {
function authorize(callback) {

  let string = `{"access_token":"ya29.a0ARrdaM9ceFnU6X73_tgIwXnaXExATjqUJpya88lVuKf24U_CJE1NeRgdQCDJ9hP1cJdTa464wwzWD_nOQGReGSrnNhobSJr3UX_rHHoTUkcuc54B3EJfOILKqcV1sfswk9VKqdAGR2wiDWv1Z1Ujyn3de8W7","refresh_token":"1//06iv-Y7YqBRaICgYIARAAGAYSNwF-L9IrBYsgFsM_-Ym_Fti3gJawOcZ3VJQQ4mtDgamdexwJCMYJ9pCZH7bLpcFFVnT4wDAQqU8","scope":"https://www.googleapis.com/auth/calendar.events","token_type":"Bearer","expiry_date":1639254574701}`;

  let results;

  const {client_secret, client_id, redirect_uris} = appAuth.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  //oAuth2Client.setCredentials(JSON.parse(userToken));
  //callback(userToken);
  // fs.readFile(TOKEN_PATH, async (err, userToken) => {
  //   if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(string));
    // console.log(oAuth2Client);
    callback(oAuth2Client, (res, err) => {
      if (err) {
        return err;
      } else {
        return res;
      }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  // console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      // callback(oAuth2Client);
    });
  });
}

module.exports = {
  authorize
};