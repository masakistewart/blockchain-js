const express = require('express');
const Blockchain = require('./blockchain');

const app = express();
const port = process.env.PORT || 8000;
const coin = new Blockchain();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('test');
});

app.get('/blockchain', (req, res) => {
  res.send(coin);
});

// app.post('/transactions', (req, res) => {
//   // res.send()
// });

// app.get('/mine', (req, res) => {
//   //
// });

app.listen(port, () => {
  console.log(`listening on Port: ${port}`);
});
