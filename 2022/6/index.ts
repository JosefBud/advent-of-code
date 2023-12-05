// const testInput = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
// const input = testInput;
// @ts-ignore
const input: string = require('./input');

const inputArray = input.split('');

let packetMarkerLength = 0;

// Part 1
// inputArray.forEach((letter, idx) => {
//   if (idx < 3) return;
//   if (packetMarkerLength) return;
//   if (
//     letter !== inputArray[idx - 1] &&
//     letter !== inputArray[idx - 2] &&
//     letter !== inputArray[idx - 3] &&
//     inputArray[idx - 1] !== inputArray[idx - 2] &&
//     inputArray[idx - 1] !== inputArray[idx - 3] &&
//     inputArray[idx - 2] !== inputArray[idx - 3]
//   ) {
//     packetMarkerLength = idx + 1;
//     console.log(packetMarkerLength);
//   }
// })

inputArray.forEach((letter, idx) => {
  if (idx < 13) return;
  if (packetMarkerLength) return;

  //  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30
  // 'm  j  q  j  p  q  m  g  b  l  j  s  p  h  d  z  t  n  v  j  f  q  w  r  c  g  s  m  l  b'
  let distinct = true;
  for (let i = idx; i > idx - 14; i--) {
    for (let a = i - 1; a > idx - 14; a--) {
      if (inputArray[i] === inputArray[a]) distinct = false;
    }
  }

  if (distinct) packetMarkerLength = idx + 1;
})

console.log(packetMarkerLength);