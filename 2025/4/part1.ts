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
while (true) {
  if (map.here === '@') {
    const positionsAround = map.lookAround();
    if (positionsAround.filter((p) => p === '@').length < 4) {
      reachable++;
    }
  }
  if (map.isEnd.ofRow && map.isEnd.ofCol) break;
  map.step('forward');
}
console.log('reachable:', reachable);

console.timeEnd(TIMER_LABEL);
