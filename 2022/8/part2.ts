/*
30373
25512
65332
33549
35390
*/

// @ts-ignore
const [input, testInput]: [string, string] = require('./input');

const inputArray = input.split('\n').map((row) => row.split('').map(Number));

const numOfEdgeTrees = inputArray.length * 4 - 4;

const firstIndex = 0;
const lastIndex = inputArray.length - 1;

let highestScenicScore = 0;

inputArray.forEach((row, rowIdx) => {
  if (rowIdx === firstIndex || rowIdx === lastIndex) return;
  row.forEach((height, colIdx) => {
    if (colIdx === firstIndex || colIdx === lastIndex) return;
    const visibility = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
    // Check column, upward
    for (let i = rowIdx - 1; i >= 0; i--) {
      visibility.top += 1;
      if (inputArray[i][colIdx] >= height) {
        break;
      };
    }

    // Check column, downward
    for (let i = rowIdx + 1; i <= lastIndex; i++) {
      visibility.bottom += 1;
      if (inputArray[i][colIdx] >= height) {
        break;
      }
    }

    // Check row, leftward
    for (let i = colIdx - 1; i >= 0; i--) {
      visibility.left += 1;
      if (inputArray[rowIdx][i] >= height) {
        break;
      }
    }

    // Check row, rightward
    for (let i = colIdx + 1; i <= lastIndex; i++) {
      visibility.right += 1;
      if (inputArray[rowIdx][i] >= height) {
        break;
      }
    }

    console.log(height, rowIdx, colIdx, visibility);
    const scenicScore = Object.values(visibility).reduce((acc, cur) => acc * cur);

    if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
  })
});

console.log(highestScenicScore);