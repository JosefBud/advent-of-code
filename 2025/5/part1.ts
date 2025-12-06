import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const ranges = input
  .trim()
  .split('\n')
  .filter((i) => i.includes('-'))
  .map((i) => i.split('-').map(Number));
const ingredients = input
  .trim()
  .split('\n')
  .filter((i) => !!i && !i.includes('-'))
  .map(Number);

let fresh = 0;
top: for (const ingredient of ingredients) {
  for (const [min, max] of ranges) {
    if (ingredient >= min && ingredient <= max) {
      fresh++;
      continue top;
    }
  }
}

console.log('Fresh:', fresh);
