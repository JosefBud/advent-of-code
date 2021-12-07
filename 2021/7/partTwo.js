const INPUT = require('./input/input.json');
// Test input:
// const INPUT = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

let largestPosition = INPUT.sort((a, b) => b - a)[0];
let leastFuelSpent;

const getFuelSpent = (number) => {
  let fuelSpent = Math.round(number / 2) * number;
  if (number % 2 === 0) fuelSpent += Math.round(number / 2);
  return fuelSpent;
};

for (let i = 0; i < largestPosition; i++) {
  let totalFuelSpent = 0;

  for (const position of INPUT) {
    totalFuelSpent += getFuelSpent(Math.abs(position - i));
  }

  if (!leastFuelSpent || totalFuelSpent < leastFuelSpent) leastFuelSpent = totalFuelSpent;
}

console.log(leastFuelSpent);

// 1 = 1
// 2 = 3
// 3 = 6
// 4 = 10
// 5 = 15
// 6 = 21
