/* eslint-disable no-undef */
const assert = require('assert');
const Blockchain = require('../dev/blockchain');
// refactor tests in this block with before or beforeEach
describe('Blockchain', () => {
  describe('#createNewBlock', () => {
    it('should add a new blocks to the chain', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewBlock(3245, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewBlock(1456, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      assert.strictEqual(bitcoin.chain.length, 3);
    });
  });

  describe('#getlastblock', () => {
    it('should return the last index of a block', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewBlock(1456, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      assert.strictEqual(bitcoin.getLastBlock().index, 2);
    });
  });

  describe('#createNewTransaction', () => {
    it('should create a new transaction', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewTransaction(100, '908NSDF8W8RWER', 'NUSFHF223245');

      assert.strictEqual(bitcoin.pendingTransactions[0].amount, 100);
      assert.strictEqual(bitcoin.pendingTransactions[0].sender, '908NSDF8W8RWER');
      assert.strictEqual(bitcoin.pendingTransactions[0].recipient, 'NUSFHF223245');
    });
    it('should have transactions on the last block in the chain', () => {
      const bitcoin = new Blockchain();
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewTransaction(100, '908NSDF8W8RWER', 'NUSFHF223245');
      bitcoin.createNewBlock(4123, '0902BFE34BDDN', 'GNDJNGJEN3342N');
      // create testing for adding multiple transactions then mining a block
      assert.strictEqual(bitcoin.chain[1].transactions.length, 1);
    });
  });
});
