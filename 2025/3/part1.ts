import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const banks: number[][] = input
  .trim()
  .split('\n')
  .map((bank) => bank.split('').map(Number));

const joltages = [];
for (const bank of banks) {
  let largestNum = 0;
  let largestNumIdx = 0;
  for (const _idx in bank) {
    const idx = +_idx;
    if (idx === bank.length - 1) break;
    const battery = bank[idx];
    if (battery > largestNum) {
      largestNum = battery;
      largestNumIdx = idx;
    }
  }

  let secondLargestNum = 0;
  let secondLargestNumIdx = 0;
  for (let i = largestNumIdx + 1; i < bank.length; i++) {
    const battery = bank[i];
    if (battery > secondLargestNum) {
      secondLargestNum = battery;
      secondLargestNumIdx = i;
    }
  }

  const joltage = largestNum * 10 + secondLargestNum;
  joltages.push(joltage);
}

console.log(joltages.reduce((p, c) => p + c));
