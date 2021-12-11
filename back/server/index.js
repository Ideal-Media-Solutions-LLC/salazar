const express = require('express');
const app = express();
app.use(express.json());
const port = require('../port.js');
import { route } from 'express/lib/application';
import { writeLanguages } from '../helpers.js';
const firefunctions = require('../helpers.js');

app.get('/', (req, res) => {
  res.send('Hello World');
});


//#region user auth

axios.get('/auth', (result) => {
  if (result.status) {
    route to some route;
  }
});

app.get('/auth', (req, res) => {
  const path = res.query.path;
  const result = await firefunctions.get(req.query.id, path);
  if (result === null) {
    res.send(400);
  } else {
    res.status(200).send(result);
  }
  res.send('Hello World');
});

app.post('/auth', (req, res) => {
  res.send('Hello World');
});

app.post('/user', async (req, res) => {
  writeLanguages()
}
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
app.get('/calendar', (req, res) => {
  res.send('Hello World');
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