import { input } from './input';
// import { input } from './test-input';
import { FoundNumber, findNumbersInString } from '../../util';

const searchRowAroundNumberForAsterisk = (
  foundNumber: FoundNumber,
  row: string,
): number | null => {
  const { digitLength, index } = foundNumber;
  const startingPoint = index === 0 ? 0 : index - 1;
  const endingPoint =
    index + digitLength + 1 > row.length ? row.length : index + digitLength + 1;
  const slice = row.slice(startingPoint, endingPoint);
  if (slice.match(gearRegex)) {
    return slice.indexOf('*') + startingPoint;
  }
  return null;
};

const rows = input.split('\n');
const gearRegex = new RegExp(/[\*]/g);
let counted: string[] = [];
// {rowIdx}-{colIdx}
const gears: string[] = [];
// { 'rowIdx-colIdx': [num, num] }
const gearNums = new Map<string, number[]>();

rows.forEach((row, idx) => {
  const foundNumbers = findNumbersInString(row);
  // Check row above
  if (idx > 0) {
    const rowAbove = rows[idx - 1];
    foundNumbers.forEach((foundNumber) => {
      const id = `${foundNumber.index}-${foundNumber.number}`;
      const gearIdx = searchRowAroundNumberForAsterisk(foundNumber, rowAbove);
      if (gearIdx && !counted.includes(id)) {
        const gearId = `${idx - 1}-${gearIdx}`;
        gears.push(gearId);
        gearNums.set(gearId, [
          ...(gearNums.get(gearId) ?? []),
          foundNumber.number,
        ]);
        counted.push(id);
      }
    });
  }
  if (idx < rows.length - 1) {
    const rowBelow = rows[idx + 1];
    foundNumbers.forEach((foundNumber) => {
      const id = `${foundNumber.index}-${foundNumber.number}`;
      const gearIdx = searchRowAroundNumberForAsterisk(foundNumber, rowBelow);
      if (gearIdx && !counted.includes(id)) {
        const gearId = `${idx + 1}-${gearIdx}`;
        gears.push(gearId);
        gearNums.set(gearId, [
          ...(gearNums.get(gearId) ?? []),
          foundNumber.number,
        ]);
        counted.push(id);
      }
    });
  }

  foundNumbers.forEach(({ digitLength, index, number }) => {
    const id = `${index}-${number}`;
    if (!counted.includes(id)) {
      if (index !== 0 && row[index - 1].match(gearRegex)) {
        const gearId = `${idx}-${index - 1}`;
        gears.push(gearId);
        gearNums.set(gearId, [...(gearNums.get(gearId) ?? []), number]);
      }
      if (
        index + digitLength < row.length &&
        row[index + digitLength].match(gearRegex)
      ) {
        const gearId = `${idx}-${index + digitLength}`;
        gears.push(gearId);
        gearNums.set(gearId, [...(gearNums.get(gearId) ?? []), number]);
      }
    }
  });
});

const final = [...gearNums.entries()]
  .filter(([, nums]) => nums.length === 2)
  .map(([, nums]) => nums.reduce((a, b) => a * b))
  .reduce((a, b) => a + b);
console.log(final);
