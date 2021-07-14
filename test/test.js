/* eslint-disable no-undef */
const assert = require('assert');
const Blockchain = require('../dev/blockchain');

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
});
