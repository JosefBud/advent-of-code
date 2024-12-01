
import { input } from './input';

const firstList: number[] = [];
const secondList: number[] = [];
input.split('\n').forEach((value) => {
  const nums = value.split('   ').map(Number);
  firstList.push(nums[0]);
  secondList.push(nums[1]);
})
firstList.sort();
secondList.sort();

const similarityScores: number[] = firstList.map((first) => {
  return first * secondList.filter(n => n === first).length;
});

console.log(similarityScores.reduce((a, b) => a + b))