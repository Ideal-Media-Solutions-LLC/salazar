const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


function listEvents(callback) {

  const calendar = google.calendar({version: 'v3'});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    //q: 'Salazar',
    singleEvents: true,
    orderBy: 'startTime',
  },
  (err, res) => {
    if (err) return console.log("The API returned an error: " + err);
    const events = res.data.items;
    callback(events);
  });
};



function createEvent(callback) {

  const calendar = google.calendar({ version: 'v3'});
  const startTime = '2021-12-13T19:00:00-07:00';
  const endTime = '2021-12-13T19:30:00-07:00';
  const peer = '1makedadavis@gmail.com';
  const description = 'Trying out during our meeting';

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
  listEvents,
  createEvent,
}