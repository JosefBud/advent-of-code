// import { input } from './test-input';
// import { input } from './test-input-3';
import { input } from './input';

const [directions, , ...rawMaps] = input;

const maps: Record<string, [string, string]> = Object.fromEntries(
  rawMaps.map((rawMap) => {
    const [, node, left, right] =
      /([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)/g.exec(rawMap)!;
    return [node, [left, right]];
  }),
);

const getSteps = (node: string) => {
  let nextNode = node;
  let stepCounter = 0;
  for (let i = 0; i < directions.length; i++) {
    if (nextNode.endsWith('Z')) {
      return stepCounter;
    }
    stepCounter++;
    const dirIdx = directions[i] === 'L' ? 0 : 1;
    nextNode = maps[nextNode][dirIdx];

    if (i === directions.length - 1) {
      i = -1;
    }
  }
  return 0;
};

const startingNodes = Object.keys(maps).filter((n) => n.endsWith('A'));
const steps: number[] = [];

startingNodes.forEach((node) => {
  steps.push(getSteps(node));
});

steps.sort((a, b) => a - b);

const primeDivisors: number[] = [];
steps.forEach((num) => {
  let primeDivisor = 0;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      primeDivisor = i;
      break;
    }
  }
  primeDivisors.push(primeDivisor);
});

primeDivisors.push(steps[0] / primeDivisors[0]);

console.log(primeDivisors.reduce((a, b) => a * b));
