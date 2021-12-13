const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());
const port = require('../port.js');
const api_z = require('../api_z.js');


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