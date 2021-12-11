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

  res.send({
    messagesFromMe: getMessagesFromMe,
    messagesFromOther: getMessagesFromOther
  });
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