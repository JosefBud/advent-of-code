import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const rows = input.split('\n').filter(Boolean);

let start = -1;
let end = -1;
const problemIdxRanges = [];
const symbolRow = rows.at(-1)!;
for (const _idx in symbolRow.split('')) {
  const idx = +_idx;
  const char = symbolRow[idx]!;
  if (char === '+' || char === '*') {
    if (start !== -1 || end !== -1) {
      end = idx - 1;
      problemIdxRanges.push([start, end]);
    }
    start = idx;
    end = idx - 1;
  }
  if (idx === symbolRow.length - 1) {
    end = idx + 1;
    problemIdxRanges.push([start, end]);
  }
}

const columns: string[][] = [];
for (const range of problemIdxRanges) {
  const [start, end] = range;
  const column: string[] = [];
  for (const row of rows) {
    const slice = row.slice(start, end);
    if (slice.includes('*') || slice.includes('+')) {
      column.push(slice.trim());
    } else {
      column.push(slice);
    }
  }
  columns.push(column);
}

let total = 0;
for (const column of structuredClone(columns)) {
  const columnWidth = column[0].length;
  const type = column.pop();
  const nums = [];
  for (let i = 0; i < columnWidth; i++) {
    const newDigits = [];
    for (const num of column) {
      newDigits.push(num[i]);
    }
    nums.push(newDigits);
  }
  const fullNums = nums.map((n) => n.reduce((p, c) => p + c));
  const columnTotal = fullNums.reduce(
    (prev, curr) => (type === '*' ? prev * int(curr) : prev + int(curr)),
    type === '*' ? 1 : 0,
  );
  total += columnTotal;
}

console.log('Total:', total);
