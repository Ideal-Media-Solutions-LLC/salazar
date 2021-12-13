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

app.get('/auth', (req, res) => {
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

app.post('/user', async (req, res) => {
  const path = req.body.path;
  const languages = req.body.languages;
  const body = req.body.
}
//#endregion


//#region chat

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./path/to/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.get('/chat', (req, res) => {
  const getMessagesFromMe = await db.collection('messages').doc(req.query.sender_ID).where('user_id', '==', req.query.reciever_ID).get();
  const getMessagesFromOther = await db.collection('messages').doc(req.query.reciever_ID).where('user_id', '==', req.query.sender_ID).get();

  //array in ordered time.
  //{A: [all msg B sent to A]
  // B: [all msg A sent to B]}
  //ordered by timestamp
  //earliest to latest
  //[{A:{msg content}},{B: {msg content}},{A: msg content}]
  var inOrderMsg = [];

  var organize = function(indexMe, indexOther) {
    if (getMessagesFromMe[indexMe] === undefined && getMessagesFromOther[indexOther] === undefined) {
      return;
    } else if (getMessagesFromMe[indexMe] === undefined) {
      inOrderMsg.push(getMessagesFromOther[indexOther]);
      organize(indexMe, indexOther + 1);
    } else if (getMessagesFromOther[indexOther] === undefined) {
      inOrderMsg.push(getMessagesFromMe[indexMe]);
      organize(indexMe+1, indexOther);
    } else if (getMessagesFromMe[indexMe].Time >= getMessagesFromOther[indexOther].Time) {
      inOrderMsg.push(getMessagesFromMe[indexMe]);
      organize(indexMe+1, indexOther);
    } else {
      inOrderMsg.push(getMessagesFromOther[indexOther]);
      organize(indexMe, indexOther+1);
    }
  }

  organize(0,0);

  res.send(inOrderMsg);
});

app.post('/chat', (req, res) => {
  const getMessagesFromOther = await db.collection('messages').doc(req.body.reciever_ID).where('user_id', '==', req.query.sender_ID).get();

  //{reviever_ID: sender_ID: {msg}}
  if (getMessagesFromOther) {
    db.collection('messages').doc(req.body.reciever_ID).update({
      req.body.sender_ID: FieldValue.arrayUnion({
        message: req.body.message,
        Time: req.body.timestamp
      })
    }).then((suc, err) => {
      if (err) {
        req.sendStatus(404);
      } else {
        req.sendStatus(201);
      }
    })
  } else {
    db.collection('messages').doc(req.body.reciever_ID).set({
      req.body.sender_ID: [{
        message: req.body.message,
        time: req.body.timestamp
      }]
    }).then((suc, err) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    })
  }

});

//azure translation
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

var subscriptionKey = require('../Azure_api_config.js');
var endpoint = "https://api.cognitive.microsofttranslator.com";

app.get('/chat/translation', (req, res) => {
  const messages = await db.collection('messages').doc(req.query.sender_ID).where('user_id', '==', req.query.reciever_ID);
  var promises = [];
  for (var i = 0; i < messages.length; ++i) {

  }

  // Add your location, also known as region. The default is global.
  // This is required if using a Cognitive Services resource.
  var location = "westus2";
  var language = req.query.language;

  axios({
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
        'text': 'Hello World!'
    }],
    responseType: 'json'
  }).then(function(response){
    console.log(JSON.stringify(response.data, null, 4));
  })
})

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