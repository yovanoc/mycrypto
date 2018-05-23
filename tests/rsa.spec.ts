import { expect } from 'chai';
import 'mocha';

import { RSA } from '../src';

let rsa: RSA;

describe('RSA', () => {

  it('should instanciate the class', () => {
    rsa = new RSA();
    const assert = expect(rsa).to.not.be.undefined;
  });

});
