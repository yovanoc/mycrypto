import { xgcd } from 'utils/xgcd';
import { gcd, generatePrime } from './utils';

export default class RSA {

  private p: bigint;
  private q: bigint;
  private modulus: bigint;
  private phi: bigint;
  private e: bigint;
  private d: bigint;

  constructor(bits?: number) {
    if (!bits) {
      this.p = generatePrime(4);
      this.q = generatePrime(4);
    } else {
      this.p = generatePrime(bits / 2);
      this.q = generatePrime(bits / 2);
    }
    this.modulus = this.p * this.q;
    this.phi = (this.p - 1n) * (this.q - 1n);
    this.e = this.generateE();
    this.d = this.generateD();
  }

  public toString(): string {
    return `RSA:
      P: ${this.p}
      Q: ${this.q}
      Modulus: ${this.modulus}
      Phi: ${this.phi}
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
    return BigInt(n).pow(this.e, this.modulus).toNumber();
  }

  public decrypt(n: number): number {
    return BigInt(n).pow(this.d, this.modulus).toNumber();
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

  private generateE(): bigint {
   let rnd = 2n;
   do {
     rnd++;
   } while (gcd(rnd, this.phi) !== 1n);
   return rnd;
  }

  private generateD(): bigint {
    const tmp = xgcd(BigInt(this.e), this.phi)[1];
    return tmp < 0n ? tmp + this.phi : tmp;
  }
}
