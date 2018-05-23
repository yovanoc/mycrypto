/* tslint:disable */

import { RSA } from './src';
import { genPrime } from './src/utils';

/*
const meh = genPrime();

while (1) {
  // tslint:disable-next-line:no-console
  console.log(meh.next().value);
}
*/

console.time('RSA');
const rsa = new RSA(105761, 105389);
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
