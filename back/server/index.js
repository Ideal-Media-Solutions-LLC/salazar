require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const port = require('../port.js');

const { listEvents, createEvent } = require('../calendar.js');
const { loadClient } = require('../googleCalApiClient.js');

//import { route } from 'express/lib/application';
//import { writeLanguages } from '../helpers.js';
const firefunctions = require('../helpers.js');
// const req = require('express/lib/request');


app.get('/', (req, res) => {
  res.send('Hello World');
});


//#region user auth

app.get('/auth', async (req, res) => {
  console.log('/auth');
  const result = await firefunctions.get(req.query.uid);
  if (result === null) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post('/auth', async (req, res) => {
  const data = req.body.info;
  /*
  data = {
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
  const usersWrite = await firefunctions.write(req.body.uid, data, 'Users');
  const messageWrite = await firefunctions.write(req.body.uid, {}, 'Messages');
  res.send(201);
});

app.get('/user', async (req, res) => {
  let result = {};
  const response = await firefunctions.get(req.query.uid);
  result.uid = req.query.uid;
  result.username = response.username;
  result.displayName = response.displayName;
  result.photo = response.photo;
  result.languages = response.languages;
  res.status(200).send(result);
});

app.get('/users', async (req, res) => {
  /*
  [
  {
    uid:
    username:
    displayName:
    photo:
    languages: {
      Chinese: 2,
      Japanese: 2,
    },
  },
  ]
  */
  const result = await firefunctions.getusers();
  res.status(200).send(result);
})

app.post('/languages', async (req, res) => {
  let data = req.body.languages;
  let key = req.body.uid;
  let result = await firefunctions.updateLanguages(key, data);
  res.send(201);
})

//#endregion


//#region chat

app.get('/chat', async (req, res) => {
  var result = await firefunctions.getMessages(req.query.user_ID, req.query.other_ID);
  if (results === null) {
    res.send(400);
  } else {
    res.status(200).send(results);
  }
});

app.post('/chat', async (req, res) => {
  var results = await firefunctions.postMessages(req.body.user_ID, req.body.other_ID, req.body.time, req.body.message);
  if (results) {
    res.send(201);
  } else {
    res.send(404);
  }
});

app.get('chatUsers', async (req, res) => {
  var results = await firefunctions.getChatUsers(req.query.user_ID);
  if (results) {
    res.send(results);
  } else {
    res.send(400);
  }
})

//azure translation
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

var subscriptionKey = require('../Azure_api_config.js');
var endpoint = "https://api.cognitive.microsofttranslator.com";

app.get('/chat/translation', async (req, res) => {
  var location = "westus2";
  var language = req.query.language;
  var messages = await firefunctions.getMessages(req.query.user_ID, req.query.other_ID);
  // const messages = [{Time: '4:30', message:'Hello there'}, {Time: '5:00', message: 'Wow. Ignore me. That is cool'}, {Time: '6:00', message: 'Baby come back'}];
  var translatedMessages = [];
  for (var i = 0; i < messages.length; ++i) {
    await axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey.token,
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      params: {
        'api-version': '3.0',
        'to': language
      },
      data: [{
        'text': messages[i].message
      }],
      responseType: 'json'
    }).then((result) => {
      translatedMessages.push(result.data[0]['translations'][0]['text']);
    });
  }
  res.send(translatedMessages);
})

//#endregion

//#region calendar

// loadClient();

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

//#region video
app.get('/video', (req, res) => {
  res.send('Hello World');
});
//#endregion


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});