import { getExampleInput, getInput } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const turns = input.trim().split('\n');
const START = 50;
let numOfZeros = 0;
let ongoingNum = START;

for (const turn of turns) {
  const direction = turn[0];
  const clicksStr = turn.substring(1);
  const number = +clicksStr.slice(-2);
  const startedOn = ongoingNum;

  if (clicksStr.length > 2) {
    numOfZeros += +clicksStr[0];
  }
  if (direction === 'L') {
    ongoingNum -= number;
  } else if (direction === 'R') {
    ongoingNum += number;
  } else {
    throw new Error('Something is fucked up, direction is ' + direction);
  }
  if (ongoingNum < 0) {
    ongoingNum += 100;
    if (startedOn !== 0 && ongoingNum !== 0) {
      numOfZeros++;
    }
  } else if (ongoingNum > 99) {
    ongoingNum -= 100;
    if (startedOn !== 0 && ongoingNum !== 0) {
      numOfZeros++;
    }
  }

  if (ongoingNum === 0) {
    numOfZeros++;
  }
}

console.log('num of zeros is', numOfZeros);
