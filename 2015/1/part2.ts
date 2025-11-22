import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const chars = input.split('');
let total = 0;
for (const _idx in chars) {
  const idx = +_idx;
  const char = input[idx];
  if (char === '(') total++;
  if (char === ')') total--;
  if (total < 0) {
    console.log(idx + 1);
    break;
  }
}
