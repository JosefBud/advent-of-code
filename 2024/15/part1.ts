import { CollidingTraversable } from '../../util/CollidingTraversable.ts';
import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();
const split = input.trim().split('\n');
const map = split.slice(0, split.indexOf('')).map((r) => r.split(''));
const moves = split
  .slice(split.indexOf('') + 1)
  .join('')
  .split('');

const warehouse = new CollidingTraversable(map, moves);

warehouse.executeMoves();
console.log(warehouse.gpsSum());
