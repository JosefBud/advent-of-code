import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const input2d = input
  .trim()
  .split('\n')
  .map((i) => i.trim().split(''));
input2d.forEach((i) => console.log(i));

let beamIdxs = new Set();
let splits = 0;
for (const row of input2d) {
  for (const _idx in row) {
    const idx = +_idx;
    const char = row[idx];

    if (char === 'S') {
      beamIdxs.add(idx);
    }
    if (char === '^') {
      if (beamIdxs.has(idx)) {
        beamIdxs.delete(idx);
        splits++;
      }
      beamIdxs.add(idx - 1);
      beamIdxs.add(idx + 1);
    }
  }
}

console.log('Num of splits:', splits);
