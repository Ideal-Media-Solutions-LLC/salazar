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


  let string = `{"access_token":"ya29.a0ARrdaM9ceFnU6X73_tgIwXnaXExATjqUJpya88lVuKf24U_CJE1NeRgdQCDJ9hP1cJdTa464wwzWD_nOQGReGSrnNhobSJr3UX_rHHoTUkcuc54B3EJfOILKqcV1sfswk9VKqdAGR2wiDWv1Z1Ujyn3de8W7","refresh_token":"1//06iv-Y7YqBRaICgYIARAAGAYSNwF-L9IrBYsgFsM_-Ym_Fti3gJawOcZ3VJQQ4mtDgamdexwJCMYJ9pCZH7bLpcFFVnT4wDAQqU8","scope":"https://www.googleapis.com/auth/calendar.events","token_type":"Bearer","expiry_date":1639254574701}`;



  const {client_secret, client_id, redirect_uris} = appAuth.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);


  oAuth2Client.setCredentials(JSON.parse(string));


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
    // meetings = events;
    // console.log(meetings);
    // if (events.length) {
    //   console.log('Upcoming 10 events:');
    //   events.map((event, i) => {
    //     const start = event.start.dateTime || event.start.date;
    //     console.log(`${start} - ${event}`);
    //     return `${start} - ${event}`;
    //   });
    // } else {
    //   console.log('No upcoming events found.');
    // }

  }).catch((err) => {
    // console.log(err);
    callback(err);
  });
  // console.log('meeeeeetttings', meetings);

}


/**
 * Create an event on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

 function createEvent(auth) {

  const calendar = google.calendar({ version: 'v3', auth });
  const startTime = '2021-12-11T19:00:00-07:00';
  const endTime = '2021-12-11T19:30:00-07:00';
  const peer = 'cschillinger1994@gmail.com';
  const description = 'Hi Chris, I saw in Salazar that you have proficiency in danish and was wondering if this time is good for you?  I really want to learn that language';

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
    auth: auth,
    calendarId: 'primary',
    resource: event,
    sendUpdates: 'all',
  }, function (err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.data);
  });
}

module.exports = {
  listEvents: listEvents,
  createEvent: createEvent
}