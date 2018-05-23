import { RSA } from "./src";
import { genPrime } from "./src/utils";

const meh = genPrime();

while (1) {
  console.log(meh.next().value);
}
