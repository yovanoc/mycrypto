export function probablyPrime(n: number | bigint, k = 10): boolean {
  if (typeof n === 'number') {
    n = BigInt(n);
  }

  if (n === 2n || n === 3n) {
    return true;
  }
  if (n % 2n === 0n || n < 2n) {
    return false;
  }

  // Write (n - 1) as 2^s * d
  let s = 0;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d = d / 2n;
    ++s;
  }

  WitnessLoop: do {
    // A base between 2 and n - 2
    let x = BigNumber.random().times(n.minus(3)).integerValue().plus(2).pow(d.toNumber(), n);

    if (x.eq(1) || x.eq(n - 1n)) {
      continue;
    }

    for (let i = s - 1; i--; ) {
      x = x.pow(2, n);
      if (x.eq(1)) {
        return false;
      }
      if (x.eq(n - 1n)) {
        continue WitnessLoop;
      }
    }

    return false;
  } while (--k);

  return true;
}
