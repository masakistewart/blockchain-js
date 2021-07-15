/* eslint-disable no-undef */
const assert = require('assert');
const { describe } = require('mocha');
const Blockchain = require('../dev/blockchain');
// refactor tests in this block with before or beforeEach
// remember happy path sad path
describe('Blockchain', () => {
  beforeEach('setup', () => {
    bitcoin = new Blockchain();
  });
  describe('#createNewBlock', () => {
    it('should add a new blocks to the chain', () => {
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewBlock(3245, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewBlock(1456, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      assert.strictEqual(bitcoin.chain.length, 4);
    });
  });

  describe('#getlastblock', () => {
    it('should return the last index of a block', () => {
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewBlock(1456, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      assert.strictEqual(bitcoin.getLastBlock().index, 3);
    });
  });

  describe('#createNewTransaction', () => {
    it('should create a new transaction', () => {
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewTransaction(100, '908NSDF8W8RWER', 'NUSFHF223245');

      assert.strictEqual(bitcoin.pendingTransactions[0].amount, 100);
      assert.strictEqual(bitcoin.pendingTransactions[0].sender, '908NSDF8W8RWER');
      assert.strictEqual(bitcoin.pendingTransactions[0].recipient, 'NUSFHF223245');
    });
    it('should have transactions on the last block in the chain', () => {
      bitcoin.createNewBlock(1187, '0JKDNGBGN324N43N', 'NBSFJ232NI23');
      bitcoin.createNewTransaction(100, '908NSDF8W8RWER', 'NUSFHF223245');
      bitcoin.createNewBlock(4123, '0902BFE34BDDN', 'GNDJNGJEN3342N');
      // create testing for adding multiple transactions then mining a block
      assert.strictEqual(bitcoin.chain[2].transactions.length, 1);
    });
  });

  describe('#hashBlock', () => {
    it('should return a string of 64 chars', () => {
      const previousBlockHash = '0JKDNGBGN324N43N';
      const currentBlockData = [
        { amount: 10, sender: '0JKDNGBGN324N43N', recipient: 'NUSFHF223245' },
        { amount: 10, sender: '321DNGBGN324N43N', recipient: 'NUSFH2LL3245' },
        { amount: 10, sender: '008DNGBGN324N43N', recipient: 'NUSFHF2NK245' },
      ];
      const nonce = 100;
      const hash1 = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
      const hash2 = bitcoin.hashBlock(`${previousBlockHash}55`, currentBlockData, nonce);
      assert.strictEqual(hash1.length, 64);
      assert.notStrictEqual(hash1, hash2);
    });
  });

  describe('#proofOfWork', () => {
    it('should return same nonce', () => {
      const previousBlockHash = '0JKDNGBGN324N43N';
      const currentBlockData = [
        { amount: 10, sender: '0JKDNGBGN324N43N', recipient: 'NUSFHF223245' },
        { amount: 10, sender: '321DNGBGN324N43N', recipient: 'NUSFH2LL3245' },
        { amount: 10, sender: '008DNGBGN324N43N', recipient: 'NUSFHF2NK245' },
      ];

      assert.strictEqual(bitcoin.proofOfWork(previousBlockHash, currentBlockData), 35757);
      assert.strictEqual(bitcoin.hashBlock(previousBlockHash, currentBlockData, 35757), '0000bfad12b78a9ba7f520a7cd6ecb5a7a1888f86786431dbce27a2ba5d91f57');
    });
  });
});
