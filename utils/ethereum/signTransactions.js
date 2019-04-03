"use strict";

const Tx = require('ethereumjs-tx');

let data, sk;
process.argv.forEach((arg) => {
    if (arg.search('--sk=') > -1) {
      sk = arg.split('=')[1];
    }
    if (arg.search('--data=') > -1) {
      data = arg.split('=')[1];
    }

});

if (!data) {
  console.error("error: data arg in base64 is mandatory");
  process.exit(1);
}

if (!sk) {
  console.error("error: sk arg is mandatory");
  process.exit(1);
}

const dataTx = Buffer.from(data, 'base64');

const privateKey = new Buffer(sk, 'hex');
const tx = new Tx(dataTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();
console.log('0x' + serializedTx.toString('hex'));

process.exit();
