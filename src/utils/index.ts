import { probablyPrime } from './mr';

export function getRandomInt(min: bigint, max: bigint) {
  return BigInt(Math.random()) * (max - min + 1n) + min;
}

export function expmod(a: bigint, b: bigint, n: bigint) {
  a = a % n;
  let result = 1n;
  let x = a;

  while (b > 0) {
    let leastSignificantBit = b % 2n;
    b = b / 2n;

    if (leastSignificantBit === 1n) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
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

export function gcd(a: bigint, b: bigint): bigint {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

export function generatePrime(digits: number): bigint {
  const min = BigInt('1' + '0'.repeat(digits - 1));
  const max = BigInt('9'.repeat(digits));
  let tmp: bigint = getRandomInt(min, max);
  while (!probablyPrime(tmp)) {
    // console.log(tmp.toNumber());
    tmp = tmp + 1n;
    if (tmp >= max) {
      throw new Error(`We can't go over ${max}`);
    }
  }
  return tmp;
}
