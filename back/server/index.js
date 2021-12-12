const express = require('express');
const app = express();
app.use(express.json());
const port = require('../port.js');
const { authorize } = require('../calendarAuth.js')
const { listEvents, createEvent } = require('../calActions.js');

//require('dotenv').config();

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
app.get('/calendar/list', async (req, res) => {

  // console.log('fishing for data', res);
  listEvents((events) => {
    res.send(events);
  })
  // var results = await authorize(listEvents);
  // // console.log("results" + results);
  // res.send(results);
  // listEvents((events)=> {
  //   res.send(events);
  // })

  // console.log('asdfasdfadsfasdfasdfasdfasdfasdfasdfasdfasdfasdf', await results);

  // try {
  //   let results = await authorize(listEvents);
  //   res.send(results);
  // } catch (error) {
  //   console.log(error)
  // }

  // authorize(listEvents);
  // res.send('Hello World');
});

app.post('/calendar/create', (req, res) => {

  //let auth = getAuthorization();





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