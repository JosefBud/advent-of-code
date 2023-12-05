const input = require('./input');
// const input = `2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8`

const pairs = input.split('\n');

let total = 0;

// pairs.forEach(pair => {
//   const [first, second] = pair.split(',');
//   const [firstMin, firstMax] = first.split('-').map(Number)
//   const [secondMin, secondMax] = second.split('-').map(Number)

//   const firstArr = [];
//   const secondArr = [];

//   for (let i = firstMin; i <= firstMax; i++) {
//     firstArr.push(i);
//   }

//   for (let i = secondMin; i <= secondMax; i++) {
//     secondArr.push(i);
//   }

//   let fits = false;

//   for (num of firstArr) {
//     if (!secondArr.includes(num)) {
//       fits = false;
//       break;
//     }
//     fits = true;
//   }

//   if (!fits) {
//     for (num of secondArr) {
//       if (!firstArr.includes(num)) {
//         fits = false;
//         break;
//       }
//       fits = true;
//     }
//   }

//   total += fits ? 1 : 0;
// })

pairs.forEach(pair => {
  const [first, second] = pair.split(',');
  const [firstMin, firstMax] = first.split('-').map(Number)
  const [secondMin, secondMax] = second.split('-').map(Number)

  const firstArr = [];
  const secondArr = [];

  for (let i = firstMin; i <= firstMax; i++) {
    firstArr.push(i);
  }

  for (let i = secondMin; i <= secondMax; i++) {
    secondArr.push(i);
  }

  let fits = false;

  for (num of firstArr) {
    if (!secondArr.includes(num)) {
      fits = false;
      break;
    }
    fits = true;
    break;
  }

  if (!fits) {
    for (num of secondArr) {
      if (!firstArr.includes(num)) {
        fits = false;
        break;
      }
      fits = true;
      break;
    }
  }

  total += fits ? 1 : 0;
})

console.log(total);