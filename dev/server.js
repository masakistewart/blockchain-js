const express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('test');
});

app.get('/blockchain', (req, res) => {
  res.send('placeholder for /blockchain');
});

app.post('/transactions', (req, res) => {
  // res.send()
});

app.get('/mine', (req, res) => {
  //
});

app.listen(port, () => {
  console.log(`listening on Port: ${port}`);
});
