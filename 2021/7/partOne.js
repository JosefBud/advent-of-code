const INPUT = require('./input/input.json');

let largestPosition = INPUT.sort((a, b) => b - a)[0];
let leastFuelSpent;

for (let i = 0; i < largestPosition; i++) {
  let totalFuelSpent = 0;

  for (const position of INPUT) {
    totalFuelSpent += Math.abs(position - i);
  }

  if (!leastFuelSpent || totalFuelSpent < leastFuelSpent) leastFuelSpent = totalFuelSpent;
}

console.log(leastFuelSpent);
