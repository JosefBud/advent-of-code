import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();
const secrets = input.trim().split('\n').map(int);

const MOD = 16777216;

const mul = (input: number) => {
  return (((input * 64) ^ input) >>> 0) % MOD;
};

const div = (input: number) => {
  return ((Math.floor(input / 32) ^ input) >>> 0) % MOD;
};

const final = (input: number) => {
  return (((input * 2048) ^ input) >>> 0) % MOD;
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

let total = 0;
for (const i of secrets) {
  total += findNSecrets(i, 2000).at(-1)!;
}
// const s = findNSecrets(1, 2000);
console.log(total);
