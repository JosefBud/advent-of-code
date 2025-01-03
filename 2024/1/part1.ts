import { int } from '../../util/index.ts';
import { input } from './input.ts';

const firstList: number[] = [];
const secondList: number[] = [];
input.split('\n').forEach((value) => {
  const nums = value.split('   ').map(int);
  firstList.push(nums[0]);
  secondList.push(nums[1]);
});
firstList.sort();
secondList.sort();

const difference: number[] = firstList.map((first, idx) => {
  const second = secondList[idx];
  return Math.abs(second - first);
});

const total = difference.reduce((a, b) => a + b);

console.log(total);
