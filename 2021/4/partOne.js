const { BINGO_BOARDS, NUMBER_DRAWS } = require('./input');

const partOne = () => {
  const numbersDrawnSoFar = [];

  const checkRows = (board) => {
    let matchTracker = 0;

    for (const row of board) {
      for (const number of row) {
        if (numbersDrawnSoFar.includes(number)) matchTracker += 1;
      }

      if (matchTracker === 5) return true;
      matchTracker = 0;
    }

    return false;
  };

  const checkColumns = (board) => {
    let matchTracker = 0;
    for (let colIndex = 0; colIndex < 5; colIndex += 1) {
      for (let rowIndex = 0; rowIndex < 5; rowIndex += 1) {
        const number = board[rowIndex][colIndex];

        if (numbersDrawnSoFar.includes(number)) matchTracker += 1;
      }

      if (matchTracker === 5) return true;

      matchTracker = 0;
    }

    return false;
  };

  const getSumOfUnmarkedNumbers = (board) => {
    let sumOfUnmarkedNumbers = 0;

    for (const row of board) {
      for (const number of row) {
        if (!numbersDrawnSoFar.includes(number)) sumOfUnmarkedNumbers += number;
      }
    }

    return sumOfUnmarkedNumbers;
  };

  numberDrawLoop: for (const number of NUMBER_DRAWS) {
    numbersDrawnSoFar.push(number);
    if (numbersDrawnSoFar.length < 5) continue;

    for (const board of BINGO_BOARDS) {
      const rowWinner = checkRows(board);
      const columnWinner = checkColumns(board);
      if (rowWinner || columnWinner) {
        console.log('\n\nBINGO!\n\n', board);
        const sumOfUnmarkedNumbers = getSumOfUnmarkedNumbers(board);
        console.log('Solution: ', sumOfUnmarkedNumbers * number);
        break numberDrawLoop;
      }
    }
  }
};

partOne();
