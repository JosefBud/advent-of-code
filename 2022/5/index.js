/* Test
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3
*/

const testCrates = [
  /* 1 */ 'ZN'.split(''),
  /* 2 */ 'MCD'.split(''),
  /* 3 */ 'P'.split(''),
]

const testInput = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

/*
    [P]                 [C] [C]
    [W]         [B]     [G] [V] [V]
    [V]         [T] [Z] [J] [T] [S]
    [D] [L]     [Q] [F] [Z] [W] [R]
    [C] [N] [R] [H] [L] [Q] [F] [G]
[F] [M] [Z] [H] [G] [W] [L] [R] [H]
[R] [H] [M] [C] [P] [C] [V] [N] [W]
[W] [T] [P] [J] [C] [G] [W] [P] [J]
 1   2   3   4   5   6   7   8   9
*/

const crates = [
  /* 1 */ 'WRF'.split(''),
  /* 2 */ 'THMCDVWP'.split(''),
  /* 3 */ 'PMZNL'.split(''),
  /* 4 */ 'JCHR'.split(''),
  /* 5 */ 'CPGHQTB'.split(''),
  /* 6 */ 'GCWLFZ'.split(''),
  /* 7 */ 'WVLQZJGC'.split(''),
  /* 8 */ 'PNRFWTVC'.split(''),
  /* 9 */ 'JWHGRSV'.split(''),
]

// const crates = [...testCrates];

const input = require('./input');
// const input = testInput;

const inputSplit = input.split('\n');

const instructions = inputSplit.map((instructionString) => {
  const [, move, from, to] = instructionString.split(/move|from|to/g);
  return { move, from, to };
})

instructions.forEach(({move, from, to}) => {
  // Part 1
  // for (let i = 0; i < move; i++) {
  //   crates[to - 1].push(crates[from - 1].pop())
  // }

  // Part 2
  crates[to - 1].push(...crates[from - 1].slice(-move));
  crates[from - 1].splice(-move, move);
});

let topOfStacks = '';

crates.forEach((stack) => {
  topOfStacks += stack[stack.length - 1];
})

console.log(topOfStacks);