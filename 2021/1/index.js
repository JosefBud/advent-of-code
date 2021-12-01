const INPUT = require('./input');

let increases = 0;

for (firstIndex in INPUT) {
  if (firstIndex === 0) continue;

  const num = INPUT[firstIndex];
  const previousNum = INPUT[firstIndex - 1];

  if (num > previousNum) {
    increases += 1;
  }
}

console.log(increases);
