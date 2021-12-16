const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const client_id = process.env.CLIENT_ID3;
const client_secret = process.env.CLIENT_SECRET3;
const redirect_uris = ["urn:ietf:wg:oauth:2.0:oob","http://localhost","https://salazar-1ee6b.firebaseapp.com/__/auth/handler"];

function listEvents( userToken, callback) {

  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials(userToken);

  const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    q: 'Salazar',
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

  //const {client_secret, client_id, redirect_uris} = appAuth.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[2]);

  oAuth2Client.setCredentials({
    "access_token": schedule.token.accessToken,
    "refresh_token": schedule.token.refreshToken,
    "scope":"https://www.googleapis.com/auth/calendar.events",
    "token_type":"Bearer",
    "expiry_date": schedule.token.expirationTime
  });

  // oAuth2Client.setCredentials({
  //   "access_token": "ya29.a0ARrdaM9ceFnU6X73_tgIwXnaXExATjqUJpya88lVuKf24U_CJE1NeRgdQCDJ9hP1cJdTa464wwzWD_nOQGReGSrnNhobSJr3UX_rHHoTUkcuc54B3EJfOILKqcV1sfswk9VKqdAGR2wiDWv1Z1Ujyn3de8W7",
  //   "refresh_token": "1//06iv-Y7YqBRaICgYIARAAGAYSNwF-L9IrBYsgFsM_-Ym_Fti3gJawOcZ3VJQQ4mtDgamdexwJCMYJ9pCZH7bLpcFFVnT4wDAQqU8",
  //   "scope":"https://www.googleapis.com/auth/calendar.events",
  //   "token_type":"Bearer",
  //   "expiry_date": 1639254574701
  // });

  // const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
  // const startTime = schedule.startTime;
  // const endTime = schedule.endTime;
  // const peer = 'cmorpv@gmail.com';
  // const description = schedule.message;
  // const language = schedule.toSpeak

  const calendar = google.calendar({version: 'v3', auth: oAuth2Client});

  const startTime = schedule.date;
  const endTime = schedule.end;
  const peer = schedule.peer;
  const name = schedule.displayName;
  const description = schedule.message;
  const language = schedule.toSpeak

  var event = {
    'summary': `Salazar has found you a language partner to speak in ${language}.`,
    'description': `${name}---${description}`,
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
        console.log(oAuth2Client);
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