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

let numOfInnerTrees = 0;

inputArray.forEach((row, rowIdx) => {
  if (rowIdx === firstIndex || rowIdx === lastIndex) return;
  row.forEach((height, colIdx) => {
    if (colIdx === firstIndex || colIdx === lastIndex) return;
    const visibility = {
      top: true,
      bottom: true,
      left: true,
      right: true
    }
    // Check column, upward
    for (let i = rowIdx - 1; i >= 0; i--) {
      if (inputArray[i][colIdx] >= height) visibility.top = false;
    }

    // Check column, downward
    for (let i = rowIdx + 1; i <= lastIndex; i++) {
      if (inputArray[i][colIdx] >= height) visibility.bottom = false;
    }

    // Check row, leftward
    for (let i = colIdx - 1; i >= 0; i--) {
      if (inputArray[rowIdx][i] >= height) visibility.left = false;
    }

    // Check row, rightward
    for (let i = colIdx + 1; i <= lastIndex; i++) {
      if (inputArray[rowIdx][i] >= height) visibility.right = false;
    }

    // Add to tally if any are visible: true
    if (Object.values(visibility).some(val => val)) numOfInnerTrees += 1;
  })
});

console.log(numOfEdgeTrees + numOfInnerTrees);