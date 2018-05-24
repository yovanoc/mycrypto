/* tslint:disable */

/*
import { genPrime, isPrime } from './src/utils';

const meh = genPrime();

while (1) {
  // tslint:disable-next-line:no-console
  console.log(meh.next().value);
}
*/

import { RSA } from './src';

console.time('RSA');
// const rsa = new RSA(3, 11);
const rsa = new RSA(105761, 105389);
// const rsa = new RSA(157, 41);
console.timeEnd('RSA');
console.log(rsa.toString());

const n = 2112;
console.log('Number', n);
const c = rsa.encrypt(n);
console.log('Crypted', c);
const newM = rsa.decrypt(c);
console.log('Decrypted', newM);

const message = "On va tester si tout vas bien :)";
console.log("Message", message);
const cipher = rsa.encryptString(message);
console.log("Cipher", cipher);
const newMessage = rsa.decryptString(cipher);
console.log('Original', newMessage);

/*
import { probablyPrime } from './src/utils/mr';

console.time('MR');
console.log(probablyPrime(67280421310721));
console.timeEnd('MR');

console.time('Classic');
console.log(isPrime(67280421310721));
console.timeEnd('Classic');
*/

/*
import { xgcd, xgcdBigNumber } from "./src/utils/xgcd"
import BigNumber from 'bignumber.js';

console.log(xgcd(3, 20)) // 7
console.log(xgcd(7, 6240)) // 1783

console.log(xgcdBigNumber(new BigNumber(3), new BigNumber(20))) // 7
console.log(xgcdBigNumber(new BigNumber(7), new BigNumber(6240))) // 1783
*/
