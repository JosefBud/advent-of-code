import { deepEqual, getExampleInput, getInput } from '../../util/index.ts';

const input = getExampleInput();
// const input = getInput();
const MOD = 16777216;

const mul = (input: number) => {
  return ((input * 64) ^ input) % MOD;
};

const div = (input: number) => {
  return (Math.floor(input / 32) ^ input) % MOD;
};

const final = (input: number) => {
  return ((input * 2048) ^ input) % MOD;
};

const findNSecrets = (secretNum: number, n: number) => {
  if (n <= 0) throw new Error('n less than 0');

  const secrets: number[] = [secretNum];
  for (let i = 0; i < n; i++) {
    // console.log(secrets, secrets.at(-1));
    secrets.push(final(div(mul(secrets.at(-1)!))));
  }
  secrets.shift();
  return secrets;
};

const s = findNSecrets(1, 2001);
console.log(s.at(-1));

const EXPECTED_RESULT = [
  15887950, 16495136, 527345, 704524, 1553684, 12683156, 11100544, 12249484,
  7753432, 5908254,
];

// console.log(deepEqual(s, EXPECTED_RESULT));
