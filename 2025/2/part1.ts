import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput().replace('\n', '');
const input = getInput();

const ranges = input
  .trim()
  .split(',')
  .map((r) => r.split('-').map(Number)) as Array<[number, number]>;

const invalids: number[] = [];

for (const [start, end] of ranges) {
  console.log(`Starting range ${start} - ${end}`);
  for (let i = start; i <= end; i++) {
    if (i.toString().length % 2 !== 0) continue;
    const iStr = i.toString();
    const left = iStr.slice(0, iStr.length / 2);
    const right = iStr.slice(iStr.length / 2);
    if (left === right) invalids.push(i);
  }
}

console.log(
  'invalid IDs:',
  invalids.reduce((p, c) => p + c),
);
