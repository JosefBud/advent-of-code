const INPUT = require('./input');

const partOne = () => {
  const bitCountObject = {
    0: 0,
    1: 0
  };
  // 12 bit counts
  const bitCounts = [
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject },
    { ...bitCountObject }
  ];

  for (binaryNum of INPUT) {
    const bits = binaryNum.split('');

    for (index in bits) {
      const bit = Number(bits[index]);
      bitCounts[index][bit] += 1;
    }
  }

  let gamma = '';
  let epsilon = '';

  for (count of bitCounts) {
    gamma += count[0] > count[1] ? '0' : '1';
    epsilon += count[0] < count[1] ? '0' : '1';
  }

  const gammaDecimal = parseInt(gamma, 2);
  const epsilonDecimal = parseInt(epsilon, 2);

  console.log(gammaDecimal * epsilonDecimal);
};

partOne();
