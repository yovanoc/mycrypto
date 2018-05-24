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

export function gcd(a: number, b: number) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
