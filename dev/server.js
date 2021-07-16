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

app.post('/transaction', (req, res) => {
  const { amount, sender, recipient } = req.body;
  const blockIndex = coin.createNewTransaction(amount, sender, recipient);
  res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

app.get('/mine', (req, res) => {
  // abstract into own fuction
  const lastBlock = coin.getLastBlock();
  const previousBlockHash = lastBlock.hash;
  const currentBlockData = {
    transactions: coin.pendingTransactions,
    index: lastBlock.index + 1,
  };
  const nonce = coin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = coin.hashBlock(previousBlockHash, currentBlockData, nonce);
  const newBlock = coin.createNewBlock(nonce, previousBlockHash, blockHash);
  res.json({
    note: 'New block mined successfully',
    block: newBlock,
  });
});

app.listen(port, () => {
  console.log(`listening on Port: ${port}`);
});
