import { BigNumber } from 'bignumber.js';
import { gcd, generatePrime } from './utils';
import { xgcdBigNumber } from './utils/xgcd';

export default class RSA {

  private p: BigNumber;
  private q: BigNumber;
  private modulus: BigNumber;
  private phi: BigNumber;
  private e: number;
  private d: number;

  constructor(bits?: number) {
    if (!bits) {
      this.p = generatePrime(4);
      this.q = generatePrime(4);
    } else {
      this.p = generatePrime(bits / 2);
      this.q = generatePrime(bits / 2);
    }
    this.modulus = this.p.times(this.q);
    this.phi = this.p.minus(1).times(this.q.minus(1));
    this.e = this.generateE();
    this.d = this.generateD();
  }

  public toString(): string {
    return `RSA:
      P: ${this.p.toNumber()}
      Q: ${this.q.toNumber()}
      Modulus: ${this.modulus.toNumber()}
      Phi: ${this.phi.toNumber()}
      E: ${this.e}
      D: ${this.d}
    `;
  }

  public get publicKey() {
    return 42;
  }

  public get privateKey() {
    return 42;
  }

  public encrypt(n: number): number {
    return new BigNumber(n).pow(this.e, this.modulus).toNumber();
  }

  public decrypt(n: number): number {
    return new BigNumber(n).pow(this.d, this.modulus).toNumber();
  }

  public encryptString(str: string): string {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
      const n = str.charCodeAt(i);
      const crypt = this.encrypt(n);
      newStr += crypt.toString() + '-';
    }
    return newStr.slice(0, -1);
  }

  public decryptString(str: string): string {
    const tmp = str.split('-').map((it) => this.decrypt(parseInt(it, 10)));
    return String.fromCharCode(...tmp);
  }

  private generateE(): number {
   let rnd = 2;
   do {
     rnd++;
   } while (gcd(rnd, this.phi.toNumber()) !== 1);
   return rnd;
  }

  private generateD(): number {
    const tmp = xgcdBigNumber(new BigNumber(this.e), this.phi)[1];
    return tmp.isNegative() ? tmp.plus(this.phi).toNumber() : tmp.toNumber();
  }
}
