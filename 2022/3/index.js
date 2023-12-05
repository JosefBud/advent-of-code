const [input, prioritiesString] = require('./input');

const priorities = prioritiesString.split('');

let total = 0;

// input.split('\n').forEach((sack) => {
//   const first = sack.slice(0, sack.length / 2)
//   const second = sack.slice(sack.length / 2, sack.length);
//   const firstArr = first.split('');
//   const secondArr = second.split('');

//   let unfoundLetters = [...priorities]

//   firstArr.forEach((item) => {
//     if (secondArr.includes(item) && unfoundLetters.includes(item)) {
//       total += priorities.indexOf(item);
//       unfoundLetters = unfoundLetters.filter(ele => ele !== item);
//     }
//   })
// })

const inputArr = input.split('\n')
const groups = []

for (let i = 0; i < inputArr.length; i += 3) {
  groups.push([inputArr[i], inputArr[i + 1], inputArr[i + 2]]);
}

groups.forEach(group => {
  let unfoundLetters = [...priorities]

  group[0].split('').forEach((item) => {
    if (group[1].includes(item) && group[2].includes(item) && unfoundLetters.includes(item)) {
      total += priorities.indexOf(item);
      unfoundLetters = unfoundLetters.filter(ele => ele !== item);
    }
  })
})

console.log(total);