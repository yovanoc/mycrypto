import { BigNumber } from 'bignumber.js';

export function probablyPrime(n: number | BigNumber, k = 10): boolean {
  if (typeof n === 'number') {
    n = new BigNumber(n);
  }

  if (n.eq(2) || n.eq(3)) {
    return true;
  }
  if (n.mod(2).eq(0) || n.lt(2)) {
    return false;
  }

  // Write (n - 1) as 2^s * d
  let s = 0;
  let d = n.minus(1);
  while (d.mod(2).eq(0)) {
    d = d.dividedBy(2);
    ++s;
  }

  WitnessLoop: do {
    // A base between 2 and n - 2
    let x = BigNumber.random().times(n.minus(3)).integerValue().plus(2).pow(d.toNumber(), n);

    if (x.eq(1) || x.eq(n.minus(1))) {
      continue;
    }

    for (let i = s - 1; i--;) {
      x = x.pow(2, n);
      if (x.eq(1)) {
        return false;
      }
      if (x.eq(n.minus(1))) {
        continue WitnessLoop;
      }
    }

    return false;
  } while (--k);

  return true;
}
