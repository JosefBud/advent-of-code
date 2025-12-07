import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const rows = input
  .trim()
  .split('\n')
  .map((r) => r.trim().split(/\s+/));
const rowLength = rows[0]!.length;

const problems = [];
for (let i = 0; i < rowLength; i++) {
  const column = [];
  for (const row of rows) {
    column.push(isNaN(+row[i]) ? row[i] : +row[i]);
  }
  problems.push(column);
}

let total = 0;
for (const problem of problems) {
  const type = problem.pop() as '*' | '+';
  const solve = (problem as number[]).reduce(
    (prev, curr) => (type === '*' ? prev * curr : prev + curr),
    type === '*' ? 1 : 0,
  );
  total += solve;
}

console.log('Total:', total);
