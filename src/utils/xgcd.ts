import { BigNumber } from 'bignumber.js';

/**
 * Calculate xgcd for two numbers
 * @param {number} a
 * @param {number} b
 * @return {number} result
 * @private
 */
export function xgcd(a: number, b: number): number[] {
  let t: number; // used to swap two variables
  let q: number; // quotient
  let r: number; // remainder
  let x = 0;
  let lastx = 1;
  let y = 1;
  let lasty = 0;

  /*
  if (!isInteger(a) || !isInteger(b)) {
    throw new Error('Parameters in function xgcd must be integer numbers');
  }
  */

  while (b) {
    q = Math.floor(a / b);
    r = a - q * b;

    t = x;
    x = lastx - q * x;
    lastx = t;

    t = y;
    y = lasty - q * y;
    lasty = t;

    a = b;
    b = r;
  }

  let res: number[];
  if (a < 0) {
    res = [-a, -lastx, -lasty];
  } else {
    res = [a, a ? lastx : 0, lasty];
  }
  return res;
}

/**
 * Calculate xgcd for two BigNumbers
 * @param {BigNumber} a
 * @param {BigNumber} b
 * @return {BigNumber[]} result
 * @private
 */
export function xgcdBigNumber(a: BigNumber, b: BigNumber): BigNumber[] {
  let t: BigNumber; // used to swap two variables
  let q: BigNumber; // quotient
  let r: BigNumber; // remainder
  const zero = new BigNumber(0);
  const one = new BigNumber(1);
  let x = zero;
  let lastx = one;
  let y = one;
  let lasty = zero;

  if (!a.isInteger() || !b.isInteger()) {
    throw new Error('Parameters in function xgcd must be integer numbers');
  }

  while (!b.isZero()) {
    q = a.div(b).integerValue();
    r = a.mod(b);

    t = x;
    x = lastx.minus(q.times(x));
    lastx = t;

    t = y;
    y = lasty.minus(q.times(y));
    lasty = t;

    a = b;
    b = r;
  }

  let res: BigNumber[];
  if (a.lt(zero)) {
    res = [a.negated(), lastx.negated(), lasty.negated()];
  } else {
    res = [a, !a.isZero() ? lastx : zero, lasty];
  }
  return res;
}
