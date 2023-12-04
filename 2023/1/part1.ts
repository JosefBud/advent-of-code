import {input} from './input';

const values = input.split('\n');

let finalTotal = 0;

values.forEach((stringVal) => {
  let total = 0;
  for (const char of stringVal.split('')) {
    const parsedChar = parseInt(char);
    if (isNaN(parsedChar)) continue;
    total += parsedChar * 10;
    break;
  }
  for (const char of stringVal.split('').reverse()) {
    const parsedChar = parseInt(char);
    if (isNaN(parsedChar)) continue;
    total += parsedChar;
    break;
  }
  console.log(stringVal, total);
  finalTotal += total;
})

console.log(finalTotal);