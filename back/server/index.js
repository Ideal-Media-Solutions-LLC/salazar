// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const port = require('../port.js');
const api_z = require('../config.js');
//import { route } from 'express/lib/application';
//import { writeLanguages } from '../helpers.js';
const firefunctions = require('../helpers.js');
//const req = require('express/lib/request');
const { listEvents, createEvent } = require('../calendar.js');
const { loadClient } = require('../googleCalApiClient.js');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});


//#region user auth

app.get('/auth', async (req, res) => {
  console.log('/auth');
  const result = await firefunctions.get(req.query.uid, 'Users');
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
  const response = await firefunctions.get(req.query.uid, 'Users');
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

app.post('/key', async (req, res) => {
  console.log(req.body);
  let data = req.body.apikey;
  let key = req.body.uid;
  let result = await firefunctions.write(key, {apikey: req.body.apikey}, 'Keys');
  res.send(201);
});

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
    let obj = {};
    obj[req.body.sender_ID] = [{
      message: req.body.message,
      time: req.body.timestamp
    }];
    db.collection('messages').doc(req.body.reciever_ID).set(obj).then((suc, err) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    })
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
const { v4: uuidv4 } = require('uuid');

var subscriptionKey = require('../config.js');
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
        'Ocp-Apim-Subscription-Key': subscriptionKey.translatorToken,
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
  const { token, uid } = req.query;
  let apiToken = JSON.parse(token);
  const user = await firefunctions.get(uid, 'Keys');
  apiToken = {
    'access_token': user.apikey,
    'refresh_token': apiToken.refreshToken,
    'expiration_time': apiToken.expirationTime
  }
  console.log(apiToken);
  await listEvents(apiToken, (events) => {
    res.send(events);
  })
});

app.post('/calendar/create', async (req, res) => {
  const event = req.body;
  console.log(event)
  const fromUser = await firefunctions.get(event.uid, 'Keys');
  const otherUser = await firefunctions.get(event.toUser, 'Users');
  // let obj = req.body;
  event.token.accessToken = fromUser.apikey;
  console.log('OtherUser', otherUser)
  // event.peer = otherUser.email;
  event.peer = otherUser.email;
  console.log(event, 'obj');
  await createEvent(event, (events) => {
    res.send(events);
  })
});

//#endregion

//#region video
app.get('/video/link', (req, res) => {
  var length = 20;
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  res.send(result);
});

app.get('/video/token', (req, res) => {
  axios({
    method: 'post',
    url: 'https://eastus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': api_z.videoToken
    }
  }).then((response) => {
    res.set('Access-Control-Allow-Origin', '*');
    //res.send(JSON.stringify(response.data))
    res.send((response.data))
  })
  .catch((error => {
    console.log(error);
    res.sendStatus(500);
  }))
});
//#endregion


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});