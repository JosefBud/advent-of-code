import { int } from '../../util.ts';
import { input } from './input.ts';
// import { input } from './test-input';

const diffsAreSafe = (diffs: number[]) => {
  return (
    // All numbers are negative, not 0, and no less than -3
    (diffs.every((diff) => diff <= 0) &&
      diffs.every((diff) => diff !== 0 && diff >= -3)) ||
    // All numbers are positive, not 0, and no more than 3
    (diffs.every((diff) => diff >= 0) &&
      diffs.every((diff) => diff !== 0 && diff <= 3))
  );
};

const getDiffs = (nums: number[]) => {
  return nums
    .map((num, idx) => {
      if (idx === nums.length - 1) return undefined;
      return num - nums[idx + 1];
    })
    .filter((n) => n !== undefined);
};

let safeCount = 0;
input.forEach((_nums) => {
  const nums = _nums.split(' ').map(int);
  const diffs = getDiffs(nums);
  if (diffsAreSafe(diffs)) {
    safeCount++;
    return;
  }

  for (const _idx in nums) {
    const idx = +_idx;
    const newDiffs = getDiffs([...nums].filter((_, i) => i !== idx));
    if (diffsAreSafe(newDiffs)) {
      safeCount++;
      return;
    }
  }
});

console.log(safeCount);
