import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const banks: number[][] = input
  .trim()
  .split('\n')
  .map((bank) => bank.split('').map(Number));

const joltages = [];
for (const bank of banks) {
  const largestNums: number[] = [0];
  const largestNumIdxs: number[] = [0];

  for (const _idx in bank) {
    const idx = +_idx;
    if (idx === bank.length - 11) break;
    const battery = bank[idx];
    if (battery > largestNums[0]) {
      largestNums[0] = battery;
      largestNumIdxs[0] = idx;
    }
  }

  for (let i = 10; i >= 0; i--) {
    const startingIdx = largestNumIdxs.at(-1)! + 1;
    largestNums.push(0);
    largestNumIdxs.push(0);
    const idx = largestNums.length - 1;
    for (let a = startingIdx; a < bank.length - i; a++) {
      const battery = bank[a];
      if (battery > largestNums[idx]) {
        largestNums[idx] = battery;
        largestNumIdxs[idx] = a;
      }
    }
  }

  const joltage = Number(largestNums.join(''));
  joltages.push(joltage);
}

console.log(joltages.reduce((p, c) => p + c));
