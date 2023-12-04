import { input } from './input';

enum NumWords {
  'one' = 1,
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
}

const values = input.split('\n');

let finalTotal = 0;

values.forEach((stringVal) => {
  let firstIndeces = new Map<string, number>();
  let lastIndeces = new Map<string, number>();
  // Will be num words but also '1', '2', '3' since they're assigned to numbers
  Object.keys(NumWords).forEach((numOrWord) => {
    const index = stringVal.indexOf(numOrWord);
    if (index !== -1) {
      firstIndeces.set(numOrWord, index);
    }
    const lastIndex = stringVal.lastIndexOf(numOrWord);
    if (lastIndex !== -1) {
      lastIndeces.set(numOrWord, lastIndex);
    }
  });

  const [[firstNum]] = [...firstIndeces.entries()].sort(([, aIdx], [, bIdx]) => aIdx - bIdx);
  const [[lastNum]] = [...lastIndeces.entries()].sort(([, aIdx], [, bIdx]) => bIdx - aIdx);

  const firstDigit = firstNum.length > 1 ? NumWords[firstNum] : parseInt(firstNum);
  const lastDigit = lastNum.length > 1 ? NumWords[lastNum] : parseInt(lastNum);

  finalTotal += firstDigit * 10;
  finalTotal += lastDigit;
});

console.log(finalTotal);
