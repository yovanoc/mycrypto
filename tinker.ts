import { RSA } from './src';
import { genPrime } from './src/utils';

const meh = genPrime();

while (1) {
  // tslint:disable-next-line:no-console
  console.log(meh.next().value);
}
