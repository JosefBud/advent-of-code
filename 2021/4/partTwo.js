const { BINGO_BOARDS, NUMBER_DRAWS } = require('./input');

const partTwo = () => {
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

  const getSumOfUnmarkedNumbers = (board, numbersDrawnThisMoment) => {
    let sumOfUnmarkedNumbers = 0;

    for (const row of board) {
      for (const number of row) {
        if (!numbersDrawnThisMoment.includes(number)) sumOfUnmarkedNumbers += number;
      }
    }

    return sumOfUnmarkedNumbers;
  };

  let latestWinningBoard;
  let latestWinningNumber;
  let latestNumbersDrawn;

  const mutableBingoBoards = [...BINGO_BOARDS];

  for (const number of NUMBER_DRAWS) {
    numbersDrawnSoFar.push(number);
    if (numbersDrawnSoFar.length < 5) continue;

    for (const boardIndex in mutableBingoBoards) {
      const board = mutableBingoBoards[boardIndex];
      const rowWinner = checkRows(board);
      const columnWinner = checkColumns(board);
      if (rowWinner || columnWinner) {
        latestWinningBoard = board;
        latestWinningNumber = number;
        latestNumbersDrawn = [...numbersDrawnSoFar];
        mutableBingoBoards.splice(boardIndex, 1);
      }
    }
  }

  console.log('\n\nLAST BINGO!\n\n', latestWinningBoard);
  const sumOfUnmarkedNumbers = getSumOfUnmarkedNumbers(latestWinningBoard, latestNumbersDrawn);
  console.log('Solution: ', sumOfUnmarkedNumbers * latestWinningNumber);
};

partTwo();
