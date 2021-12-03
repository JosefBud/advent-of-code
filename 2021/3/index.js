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

// partOne();

const partTwo = () => {
  const bitCountObject = {
    0: 0,
    1: 0,
    indecesWith0: [],
    indecesWith1: []
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

  let oxygenRating;
  let scrubberRating;

  let updatingInput = [...INPUT];

  for (let i = 0; i < 12; i++) {
    bitCounts[i] = { ...bitCountObject };

    for (inputIndex in updatingInput) {
      const binaryNum = updatingInput[inputIndex];
      const bit = Number(binaryNum.split('')[i]);
      bitCounts[i][bit] += 1;

      if (bit === 0) {
        const currentArray = bitCounts[i].indecesWith0;
        bitCounts[i].indecesWith0 = [...currentArray, inputIndex];
      } else {
        const currentArray = bitCounts[i].indecesWith1;
        bitCounts[i].indecesWith1 = [...currentArray, inputIndex];
      }
    }

    const bitCountFinal = bitCounts[i];

    const indecesToContinue =
      bitCountFinal[0] > bitCountFinal[1]
        ? bitCountFinal.indecesWith0
        : bitCountFinal.indecesWith1;

    updatingInput = updatingInput.filter((ele, index) =>
      indecesToContinue.includes(index.toString())
    );

    if (updatingInput.length === 1) {
      break;
    }
  }

  oxygenRating = parseInt(updatingInput[0], 2);
  updatingInput = [...INPUT];

  // so much repeated code that hurts my heart but its friday and I want to leave

  for (let i = 0; i < 12; i++) {
    bitCounts[i] = { ...bitCountObject };

    for (inputIndex in updatingInput) {
      const binaryNum = updatingInput[inputIndex];
      const bit = Number(binaryNum.split('')[i]);
      bitCounts[i][bit] += 1;

      if (bit === 0) {
        const currentArray = bitCounts[i].indecesWith0;
        bitCounts[i].indecesWith0 = [...currentArray, inputIndex];
      } else {
        const currentArray = bitCounts[i].indecesWith1;
        bitCounts[i].indecesWith1 = [...currentArray, inputIndex];
      }
    }

    const bitCountFinal = bitCounts[i];

    const indecesToContinue =
      bitCountFinal[1] < bitCountFinal[0]
        ? bitCountFinal.indecesWith1
        : bitCountFinal.indecesWith0;

    updatingInput = updatingInput.filter((ele, index) =>
      indecesToContinue.includes(index.toString())
    );

    if (updatingInput.length === 1) {
      break;
    }
  }

  scrubberRating = parseInt(updatingInput[0], 2);

  console.log(oxygenRating * scrubberRating);
};

partTwo();
