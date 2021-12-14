const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

 let appAuth;
 // Load client secrets from a local file.
 fs.readFile('credentials.json', (err, content) => {
   if (err) return console.log('Error loading client secret file:', err);
   // Authorize a client with credentials, then call the Google Calendar API.
   // authorize(JSON.parse(content), createEvent);
   // authorize(JSON.parse(content), listEvents);
   appAuth = JSON.parse(content);
 });


function listEvents(callback, userToken) {

  const {client_secret, client_id, redirect_uris} = appAuth.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials(JSON.parse(process.env.USER_TOKEN));

  const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    //q: 'Salazar',
    singleEvents: true,
    orderBy: 'startTime',
  }).then((res) => {
      const events = res.data.items;
      callback(events);
  }).catch((err) => {
      callback(err);
  });
};


function createEvent(schedule, callback, userToken) {

  const {client_secret, client_id, redirect_uris} = appAuth.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials(JSON.parse(process.env.USER_TOKEN));

  const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
  const startTime = schedule.startTime;
  const endTime = schedule.endTime;
  const peer = schedule.peer;
  const description = schedule.description;

  var event = {
    'summary': 'Salazar has found you a language partner',
    'description': description,
    'start': {
      'dateTime': startTime,
      //'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': endTime,
      //'timeZone': 'America/Los_Angeles',
    },
    'attendees': [
      { 'email': peer },
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 },
      ],
    },
  };

  calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    sendUpdates: 'all',
    },
    (err, event) => {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      callback({
        message: "Event successfully created",
        link: event.data.htmlLink,
      });
  });
};

module.exports = {
  listEvents: listEvents,
  createEvent: createEvent
}