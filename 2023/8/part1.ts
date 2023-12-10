// import { input } from './test-input';
// import { input } from './test-input-2';
import { input } from './input';

const [directions, , ...rawMaps] = input;

const maps: Record<string, [string, string]> = Object.fromEntries(
  rawMaps.map((rawMap) => {
    const [, node, left, right] =
      /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/g.exec(rawMap)!;
    console.log('node:', node, 'left:', left, 'right:', right);
    return [node, [left, right]];
  }),
);

let nextNode = 'AAA';
let stepCounter = 0;
for (let i = 0; i < directions.length; i++) {
  if (nextNode === 'ZZZ') {
    break;
  }
  stepCounter++;
  const dirIdx = directions[i] === 'L' ? 0 : 1;
  nextNode = maps[nextNode][dirIdx];
  if (i === directions.length - 1) {
    i = -1;
  }
}

console.log('step counter', stepCounter);
