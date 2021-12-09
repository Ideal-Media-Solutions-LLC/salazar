const express = require('express');
const app = express();
app.use(express.json());
const port = require('../port.js');


app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});