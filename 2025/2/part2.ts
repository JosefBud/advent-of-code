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
  ids: for (let i = start; i <= end; i++) {
    const iStr = i.toString();
    for (let a = 1; a <= Math.round(iStr.length / 2); a++) {
      const digits = iStr.slice(0, a);
      const match = iStr.match(new RegExp(`^(${digits}){2,}$`));
      if (match) {
        invalids.push(i);
        continue ids;
      }
    }
  }
}

console.log(
  'invalid IDs:',
  invalids.reduce((p, c) => p + c),
);
