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
const rsa = new RSA(157, 41);
console.timeEnd('RSA');
console.log(rsa.toString());

const m = 2112;
console.log('Message', m);
const c = rsa.encrypt(m);
console.log('Cipher', c);
const newM = rsa.decrypt(c);
console.log('Decrypted', newM);
