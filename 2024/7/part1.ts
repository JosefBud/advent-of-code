import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const operators = ['add', 'mul'];

const equations = input
  .trim()
  .split('\n')
  .map((eq) => {
    const product = int(eq.split(':')[0]);
    const nums = eq.split(':')[1].trim().split(' ').map(int);
    return { product, nums };
  });

let sum = 0;
equations.forEach(({ product, nums }) => {
  let ops = ['add', 'mul'];
  // console.log(product, nums);
  for (let i = 2; i < nums.length; i++) {
    const moreOps = [...ops, ...ops];
    const halfWayPoint = Math.floor((1 + moreOps.length) / 2 - 1);
    const extendedOps = moreOps.map((op, idx) => {
      return `${op} ${idx <= halfWayPoint ? 'add' : 'mul'}`;
    });
    ops = [...extendedOps];
  }

  for (const op of ops) {
    const _ops = op.split(' ');
    const total = nums.reduce((a, b, idx) => {
      const _op = _ops[idx - 1];
      if (_op === 'add') {
        return a + b;
      } else if (_op === 'mul') {
        return a * b;
      }
      return 0; // This will never happen
    });
    if (total === product) {
      sum += total;
      break;
    }
  }
});

console.log(sum);
