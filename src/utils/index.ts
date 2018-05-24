import { BigNumber } from 'bignumber.js';
import { probablyPrime } from './mr';

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomIntBigNumber(min: number | BigNumber, max: number | BigNumber): BigNumber {
  if (typeof min === 'number') {
    min = new BigNumber(min);
  }
  if (typeof max === 'number') {
    max = new BigNumber(max);
  }
  if (!min.isInteger() || !max.isInteger()) {
    throw new Error('min and max must be integers.');
  }
  const tmp = max.minus(min).plus(1);
  return BigNumber.random().times(tmp).integerValue().plus(min);
}

export function isPrime(n: number): boolean {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) { return false; }
  const m = Math.sqrt(n);
  for (let i = 2; i <= m; i++) { if (n % i === 0) { return false; } }
  return true;
}

export function* genPrime() {
  let count = 0;
  while (1) {
    if (isPrime(count)) { yield count; }
    count++;
  }
}

export function gcd(a: number, b: number) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

export function generatePrime(digits: number): BigNumber {
  const min = new BigNumber('1' + '0'.repeat(digits - 1));
  const max = new BigNumber('9'.repeat(digits));
  let tmp: BigNumber = getRandomIntBigNumber(min, max);
  while (!probablyPrime(tmp)) {
    // console.log(tmp.toNumber());
    tmp = tmp.plus(1);
    if (tmp.gte(max)) {
      throw new Error(`We can't go over ${max.toNumber()}`);
    }
  }
  return tmp;
}
