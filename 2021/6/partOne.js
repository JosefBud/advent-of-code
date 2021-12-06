const INPUT = require('./input.json');

const lanternfish = [...INPUT];

for (let days = 0; days < 80; days += 1) {
  if (days < 3) console.log(lanternfish);
  for (const fishIndex in lanternfish) {
    if (lanternfish[fishIndex] === 0) lanternfish.push(8);
    lanternfish[fishIndex] -= 1;
    if (lanternfish[fishIndex] === -1) lanternfish[fishIndex] = 6;
  }
}

console.log(lanternfish.length);
