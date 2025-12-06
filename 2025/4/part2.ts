import { getExampleInput, getInput } from '../../util/index.ts';
import { PaperRollTraversable } from './PaperRollTraversable.ts';

// const input = getExampleInput();
const input = getInput();

const TIMER_LABEL = 'Time to execute';
console.time(TIMER_LABEL);

const isLiteral = (v: string): v is '.' | '@' => {
  return v === '.' || v === '@';
};

const arrays: Array<Array<'@' | '.'>> = input
  .trim()
  .split('\n')
  .map((r) => r.trim().split('').filter(isLiteral));

const map = new PaperRollTraversable(arrays);

let reachable = 0;
let reachables = [];
while (true) {
  if (map.here === '@') {
    const positionsAround = map.lookAround();
    if (positionsAround.filter((p) => p === '@').length < 4) {
      reachable++;
      const [row, col] = map.position;
      map._grid[row][col] = '.';
    }
  }
  if (map.isEnd.ofRow && map.isEnd.ofCol) {
    reachables.push(reachable);
    reachable = 0;
    map.goTo(0, 0);
    if (reachables.at(-1) === 0) {
      break;
    }
  }
  map.step('forward');
}
console.log(
  'reachable:',
  reachables.reduce((prev, curr) => prev + curr),
);

console.timeEnd(TIMER_LABEL);
