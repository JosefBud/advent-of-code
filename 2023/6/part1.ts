import { int } from '../../util';
// import { input } from './test-input';
import { input } from './input';

const [times, bestDistances] = input.split('\n').map((str) => {
  return str.split(':')[1].split(' ').filter(Boolean).map(int);
});

const allNumOfWays: number[] = [];
times.forEach((time, idx) => {
  const bestDist = bestDistances[idx];
  let numOfWays = 0;
  for (let i = 0; i < time; i++) {
    const leftover = time - i;
    const finalDist = leftover * i;
    if (finalDist > bestDist) {
      numOfWays++;
    }
  }
  allNumOfWays.push(numOfWays);
});

console.log(allNumOfWays.reduce((a, b) => a * b));
