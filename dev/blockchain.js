const sha256 = require('sha256');

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];

    // add genesis block => first block in chain
    this.createNewBlock();
  }

  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(amount, sender, recipient) {
    const newTransaction = {
      amount,
      sender,
      recipient,
    };

    this.pendingTransactions.push(newTransaction);

    return this.getLastBlock().index + 1;
  }

  // Will most likely move this later to seperate file depending on convention
  // eslint-disable-next-line class-methods-use-this
  hashBlock(previousBlockHash, currentBlockData, nonce) {
    const DataAsString = `${previousBlockHash}${nonce}${JSON.stringify(currentBlockData)}`;
    const hash = sha256(DataAsString);
    return hash;
  }

  proofOfWork(previousBlockHash, currentBlockData) {
    // repeatedly hash block until it finds correct hash starting with 4 zeros => 0000SOMETHING
    // uses current block data + previous block hash for the hash
    // continously changes nonce value until it finds correct the hash,
    // return the nonce value the matches the correct hash
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substr(0, 4) !== '0000') {
      nonce += 1;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
  }
}

module.exports = Blockchain;
