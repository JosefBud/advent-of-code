import { input } from './input';
// import { input } from './test-input';

let safeCount = 0;
input.forEach((_nums) => {
  console.log(_nums);
  const diffs: number[] = [];
  const nums = _nums.split(' ').map(Number);
  for (const _idx in nums) {
    const idx = Number(_idx);
    if (idx === nums.length - 1) break;

    const num = nums[idx];
    const nextNum = nums[idx + 1];
    const diff = num - nextNum;
    diffs.push(diff);
  }
  if (
    (diffs.every((diff) => diff > 0) || diffs.every((diff) => diff < 0)) &&
    diffs.every((diff) => Math.abs(diff) <= 3)
  ) {
    safeCount++;
  }
  console.log('-- next --');
});

console.log(safeCount);
