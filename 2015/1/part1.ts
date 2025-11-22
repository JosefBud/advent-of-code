import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

console.log(
  [...input.matchAll(/\(/g)].length - [...input.matchAll(/\)/g)].length,
);
