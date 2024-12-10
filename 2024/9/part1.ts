import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const rawMap = input.trim().split('').map(int);

const map: Array<number | undefined> = rawMap.flatMap((num, idx) => {
  return Array(num).fill(idx % 2 === 0 ? idx / 2 : undefined);
});

for (const _idx in map) {
  const idx = int(_idx);
  const val = map[idx];
  if (val === undefined) {
    const lastIdx = map.findLastIndex((n) => n !== undefined);
    if (lastIdx <= idx) {
      break;
    }
    map[idx] = map[lastIdx];
    map[lastIdx] = undefined;
  }
}

const checksum = map.reduce((a, b, idx) => {
  return (a ?? 0) + (b ?? 0) * idx;
}, 0);
console.log(checksum);
