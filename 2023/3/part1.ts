import { input } from './input';
// import { input } from './test-input';
import { FoundNumber, findNumbersInString } from '../../util';

const searchRowAroundNumber = (
  foundNumber: FoundNumber,
  row: string,
): boolean => {
  const { digitLength, index, number } = foundNumber;
  const startingPoint = index === 0 ? 0 : index - 1;
  const endingPoint =
    index + digitLength + 1 > row.length ? row.length : index + digitLength + 1;
  const slice = row.slice(startingPoint, endingPoint);
  console.log(slice, !!slice.match(nonSymbols), foundNumber);
  if (slice.match(nonSymbols)) {
    return true;
  }
  return false;
};

const rows = input.split('\n');
const nonSymbols = new RegExp(/[^0-9.]/g);
let total = 0;
let counted: string[] = [];

rows.forEach((row, idx) => {
  const foundNumbers = findNumbersInString(row);
  // Check row above
  if (idx > 0) {
    const rowAbove = rows[idx - 1];
    foundNumbers.forEach((foundNumber) => {
      const id = `${foundNumber.index}-${foundNumber.number}`;
      if (
        searchRowAroundNumber(foundNumber, rowAbove) &&
        !counted.includes(id)
      ) {
        total += foundNumber.number;
        counted.push(id);
      }
    });
  }
  if (idx < rows.length - 1) {
    const rowBelow = rows[idx + 1];
    foundNumbers.forEach((foundNumber) => {
      const id = `${foundNumber.index}-${foundNumber.number}`;
      if (
        searchRowAroundNumber(foundNumber, rowBelow) &&
        !counted.includes(id)
      ) {
        total += foundNumber.number;
        counted.push(id);
      }
    });
  }

  foundNumbers.forEach(({ digitLength, index, number }) => {
    const id = `${index}-${number}`;
    if (!counted.includes(id)) {
      let symbols = '';
      if (index !== 0) {
        symbols += row[index - 1];
      }
      if (index + digitLength < row.length) {
        symbols += row[index + digitLength];
      }
      console.log(`number ${number} symbols ${symbols}`);
      if (symbols.match(nonSymbols)) {
        total += number;
        counted.push(id);
      }
    }
  });
});

console.log(total);
