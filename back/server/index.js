require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const port = require('../port.js');
const { listEvents, createEvent } = require('../calendar.js');
const { loadClient } = require('../googleCalApiClient.js');




app.get('/', (req, res) => {
  res.send('Hello World');
});


//#region user auth
app.get('/auth', (req, res) => {
  res.send('Hello World');
});

app.post('/auth', (req, res) => {
  res.send('Hello World');
});
//#endregion


//#region chat
app.get('/chat', (req, res) => {
  res.send('Hello World');
});

app.post('/chat', (req, res) => {
  res.send('Hello World');
});
//#endregion

//#region calendar

loadClient();

app.get('/calendar/list', async (req, res) => {

  await listEvents((events) => {
    res.send(events);
  })
});

app.post('/calendar/create', async (req, res) => {

  await createEvent((events) => {
    res.send(events);
  })
});

//#endregion

//#region users
app.get('/users', (req, res) => {
  res.send('Hello World');
});
//#endregion


//#region video
app.get('/video', (req, res) => {
  res.send('Hello World');
});
//#endregion


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});