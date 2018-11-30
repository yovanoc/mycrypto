export function xgcd(a: bigint, b: bigint): BigInt64Array {
  let t: bigint; // used to swap two variables
  let q: bigint; // quotient
  let r: bigint; // remainder
  let x = 0n;
  let lastx = 1n;
  let y = 1n;
  let lasty = 0n;

  /*
  if (!isInteger(a) || !isInteger(b)) {
    throw new Error('Parameters in function xgcd must be integer numbers');
  }
  */

  while (b) {
    q = a / b;
    // tslint:disable-next-line:no-console
    console.log(q);
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

  let res = new BigInt64Array(3);
  if (a < 0) {
    res.set([-a, -lastx, -lasty]);
  } else {
    res.set([a, a ? lastx : 0n, lasty]);
  }
  return res;
}
