import { int } from '../../util';
// import { input } from './test-input';
import { input } from './input';

const [time, bestDistance] = input.split('\n').map((str) => {
  return int(
    str
      .split(':')[1]
      .split(' ')
      .filter(Boolean)
      .reduce((a, b) => a + b),
  );
});

let numOfWays = 0;
const start = new Date();
for (let i = 0; i < time; i++) {
  const leftover = time - i;
  const finalDist = leftover * i;
  if (finalDist > bestDistance) {
    numOfWays++;
  }
}
const end = new Date();

console.log('Done in:', end.getTime() - start.getTime(), 'ms');

console.log(numOfWays);
