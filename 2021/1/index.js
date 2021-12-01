const INPUT = require('./input');

const partOne = () => {
  let increases = 0;

  for (index in INPUT) {
    if (index === 0) continue;

    const num = INPUT[index];
    const previousNum = INPUT[index - 1];

    if (num > previousNum) {
      increases += 1;
    }
  }

  console.log(increases);
};

// partOne();

const partTwo = () => {
  let increases = 0;
  let firstSum;
  let secondSum;

  for (index in INPUT) {
    if (index === 0 || index === 1) continue;

    const firstNum = INPUT[index - 2];
    const secondNum = INPUT[index - 1];
    const thirdNum = INPUT[index];
    const sum = firstNum + secondNum + thirdNum;

    if (!firstSum) {
      firstSum = sum;
      continue;
    }

    secondSum = sum;

    if (secondSum > firstSum) {
      increases += 1;
    }

    firstSum = sum;
  }

  console.log(increases);
};

partTwo();
