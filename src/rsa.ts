import { BigNumber } from 'bignumber.js';
import { gcd, modInverse } from './utils';

export default class RSA {

  private p: BigNumber;
  private q: BigNumber;
  private modulus: BigNumber;
  private phi: BigNumber;
  private e: number;
  private d: number;

  constructor(p: number, q: number) {
    this.p = new BigNumber(p);
    this.q = new BigNumber(q);
    this.modulus = this.p.times(this.q);
    this.phi = new BigNumber(p - 1).times(q - 1);
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
   let rnd = 1;
   do {
     rnd++;
   } while (gcd(rnd, this.phi.toNumber()) !== 1);
   return rnd;
  }

  private generateD(): number {
    let rnd: number;
    do {
      rnd = modInverse(this.e, this.phi.toNumber());
    } while (rnd === this.e);
    return rnd;
  }
}
