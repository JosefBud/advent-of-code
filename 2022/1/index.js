const input = require('./input')

let total = 0;
const caloriesPerElf = [];

input.split('\n').forEach((numString) => {
  if (!numString) {
    caloriesPerElf.push(total);
    total = 0;
    return;
  }
  total += parseInt(numString);
})

const [top1, top2, top3] = caloriesPerElf.sort((a, b) => b - a);
console.log(top1 + top2 + top3)