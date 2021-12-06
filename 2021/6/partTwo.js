const INPUT = require('./input.json');

const lanternfish = [...INPUT];
// Test input:
// const lanternfish = [3, 4, 3, 1, 2];

// Age is index, index is life
const counts = new Array(9).fill(0);

for (const age of lanternfish) counts[age] += 1;

for (let days = 0; days < 256; days += 1) {
  let phoenixes = 0;

  for (let index = 0; index < counts.length; index += 1) {
    if (index === 0) {
      phoenixes = counts[0];
    } else {
      counts[index - 1] = counts[index];
    }

    counts[index] = 0;
  }

  counts[6] += phoenixes;
  counts[8] = phoenixes;
}

let totalCount = 0;

for (const count of counts) {
  totalCount += count;
}

console.log(totalCount);
