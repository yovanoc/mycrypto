import { BigNumber } from 'bignumber.js';

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

/*
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
*/

export function modInverse(a: number, b: number): number {
  a %= b;
  for (let x = 1; x < b; x++) {
    if ((a * x) % b === 1) {
      return x;
    }
  }
}

/*
export function xgcd(a: number, b: number) {
  if (b === 0) {
    return [1, 0, a];
  }

  const temp = xgcd(b, a % b);
  const x = temp[0];
  const y = temp[1];
  const d = temp[2];
  return [y, x - y * Math.floor(a / b), d];
}
*/

export function xgcd(a: BigNumber, b: BigNumber) {
  if (b.eq(0)) {
    return [1, 0, a];
  }

  const temp = xgcd(b, a.mod(b));
  const x = temp[0];
  const y = temp[1];
  const d = temp[2];
  return [y, new BigNumber(x).minus(a.div(b.toNumber()).integerValue().times(y)), d];
}

export function modInverseOpti(a: BigNumber, b: BigNumber): number {
  return xgcd(a, b)[0];
}

export function gcd(a: number, b: number) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
