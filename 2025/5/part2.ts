import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const sort = (a: [number, number], b: [number, number]): -1 | 0 | 1 => {
  const [aMin, aMax] = a;
  const [bMin, bMax] = b;
  if (aMin < bMin) return -1;
  if (aMax > bMax) return 1;
  return 0;
};

let ranges: [number, number][] = input
  .trim()
  .split('\n')
  .filter((i) => i.includes('-'))
  .map((i) => i.split('-').map(Number)) as any;
const originalRanges = structuredClone(ranges);
originalRanges.sort();

ranges.sort(sort);
let builtRanges: [number, number][] = [];
for (let i = 0; i <= ranges.length - 1; i++) {
  const [thisMin, thisMax] = ranges[i];
  if (i === ranges.length - 1) {
    builtRanges.push([thisMin, thisMax]);
  } else {
    const [nextMin, nextMax] = ranges[i + 1];
    if (thisMax >= nextMin) {
      if (thisMax <= nextMax) {
        builtRanges.push([thisMin, nextMax]);
        i++; // skip next
      } else if (thisMax > nextMax) {
        builtRanges.push([thisMin, thisMax]);
        i++; // skip next
      }
    } else {
      builtRanges.push([thisMin, thisMax]);
    }
  }

  if (i + 1 > ranges.length - 1) {
    if (ranges.length > builtRanges.length) {
      // the jankiest recursion I've ever done, but alas...
      ranges = structuredClone(builtRanges);
      builtRanges = [];
      i = -1;
    }
  }
}

console.log(
  'Freshies:',
  builtRanges.reduce((prev, curr) => prev + (curr[1] - curr[0]) + 1, 0),
);
