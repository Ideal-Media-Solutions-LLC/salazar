const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());
const port = require('../port.js');
//import { route } from 'express/lib/application';
//import { writeLanguages } from '../helpers.js';
const firefunctions = require('../helpers.js');
const api_z = require('../api_z.js');
const api_z = require('../api_z.js');

app.get('/', (req, res) => {
  res.send('Hello World');
});


//#region user auth

app.get('/auth', async (req, res) => {
  const result = await firefunctions.get(req.query.uid);
  if (result === null) {
    res.send(400);
  } else {
    res.status(200).send(result);
  }
  res.send('Hello World');
});

app.post('/auth', (req, res) => {
  const data = req.body.info;
  /*data = {
    displayName: ,
    languages: {
      Chinese: 2,
      Korean: 2,
    }
    uid: ,
    email: ,
    apikey: ,
    refreshtoken: ,
    photoURL: ,
  }
  */
  firefunctions.write(req.body.uid, data).then(() => {
    res.send(201);
  });
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

app.get('/video/token', (req, res) => {
  axios({
    method: 'post',
    url: 'https://eastus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': api_z
    },
    

    
  });
  res.send('Hello World');
});
//#endregion


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});