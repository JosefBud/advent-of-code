const INPUT = require('./input/input.json');
// Test input:
// const INPUT = require('./input/example.json');
/*
   0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
*/
const DIGITS = {
  0: ['a', 'b', 'c', 'e', 'f', 'g'],
  1: ['c', 'f'],
  2: ['a', 'c', 'd', 'e', 'g'],
  3: ['a', 'c', 'd', 'f', 'g'],
  4: ['b', 'c', 'd', 'f'],
  5: ['a', 'b', 'd', 'f', 'g'],
  6: ['a', 'b', 'd', 'e', 'f', 'g'],
  7: ['a', 'c', 'f'],
  8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  9: ['a', 'b', 'c', 'd', 'f', 'g']
};

// In hindsight the keys and values should have been swapped, but I was already too far
// down this rabbit hole to turn back
const BLANK_LETTER_MAP = {
  a: '',
  b: '',
  c: '',
  d: '',
  e: '',
  f: '',
  g: ''
};

const arrayEquals = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

let sum = 0;

for (const digitSet of INPUT) {
  let finalDigits = '';

  const letterMap = { ...BLANK_LETTER_MAP };
  const [patterns, output] = digitSet;
  const [one] = patterns.filter((pattern) => pattern.length === 2);
  const [seven] = patterns.filter((pattern) => pattern.length === 3);
  const [four] = patterns.filter((pattern) => pattern.length === 4);

  for (const char of seven.split('')) {
    if (!one.includes(char)) {
      letterMap.a = char;
    }
  }

  // Find C and F
  for (const pattern of patterns) {
    const [mysteryOne, mysteryTwo] = one.split('');
    if (pattern.length === 6) {
      // Digit is 6
      // Using the segment positions of 1 (C & F), compared to 6 (all segments except C)
      // we can find out which segment is C and which is F
      if (pattern.includes(mysteryOne) && !pattern.includes(mysteryTwo)) {
        letterMap.f = mysteryOne;
        letterMap.c = mysteryTwo;
      } else if (!pattern.includes(mysteryOne) && pattern.includes(mysteryTwo)) {
        letterMap.f = mysteryTwo;
        letterMap.c = mysteryOne;
      }
    }
  }

  for (const pattern of patterns) {
    if (pattern.length === 5) {
      if (pattern.includes(letterMap.c) && !pattern.includes(letterMap.f)) {
        // Digit is 2
        // Compare 4 against 2 to find unknown segment positions
        for (const i of four.split('')) {
          if (i !== letterMap.f && i !== letterMap.c) {
            if (!pattern.includes(i)) letterMap.b = i;
          }
        }

        // Check through four again to get the remaining segment
        for (const i of four.split('')) {
          if (i !== letterMap.f && i !== letterMap.c && i !== letterMap.b) {
            letterMap.d = i;
          }
        }
      }
    }
  }

  // Leftover positions: E,G
  for (const pattern of patterns) {
    if (pattern.length === 6) {
      if (pattern.includes(letterMap.d) && pattern.includes(letterMap.c)) {
        // Digit is 9
        // 9 is only missing the E segment, we're missing the E and G segments
        // Comparing against the map, the one absent letter will be G
        const letterMapValues = Object.values(letterMap);
        for (const i of pattern.split('')) {
          if (!letterMapValues.includes(i)) letterMap.g = i;
        }
      }
    }
  }

  // The last remaining missing letter is assigned to E
  let remainingLetter = Object.keys(letterMap);

  for (const value of Object.values(letterMap)) {
    if (value) {
      remainingLetter.splice(remainingLetter.indexOf(value), 1);
    }
  }
  letterMap.e = remainingLetter[0];

  // Converting output values to digits
  for (const digit of output) {
    const convertedArray = [];
    for (const i of digit.split('')) {
      for (const [key, value] of Object.entries(letterMap)) {
        if (value === i) {
          convertedArray.push(key);
        }
      }
    }

    convertedArray.sort();

    for (const [key, value] of Object.entries(DIGITS)) {
      if (arrayEquals(convertedArray, value)) {
        finalDigits += key;
      }
    }
  }

  // Calculating sum
  sum += Number(finalDigits);
}

console.log(sum);
