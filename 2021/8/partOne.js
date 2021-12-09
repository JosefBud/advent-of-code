const INPUT = require('./input/input.json');
// Test input:
// const INPUT = require('./input/example.json');

let numOfTimesDigitsAppear = 0;

for (const digitSet of INPUT) {
  const [, output] = digitSet;
  for (const value of output) {
    switch (value.length) {
      case 2:
        numOfTimesDigitsAppear += 1;
        break;
      case 3:
        numOfTimesDigitsAppear += 1;
        break;
      case 4:
        numOfTimesDigitsAppear += 1;
        break;
      case 7:
        numOfTimesDigitsAppear += 1;
        break;
      default:
        break;
    }
  }
}

console.log(numOfTimesDigitsAppear);
