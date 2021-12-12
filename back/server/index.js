const express = require('express');
const app = express();
app.use(express.json());
const port = require('../port.js');


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

app.get('/chat/translation', (req, res) => {
  const messages = await db.collection('messages').doc(req.body.sender_ID).where('user_id', '==', req.body.reciever_ID);
  var promises = [];
  for (var i = 0; i < messages.length; ++i) {
    
  }
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