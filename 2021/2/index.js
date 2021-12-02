const INPUT = require('./input');

function partOne() {
  let horizontalPosition = 0;
  let depth = 0;

  for (instruction of INPUT) {
    let [direction, length] = instruction.split(' ');
    length = Number(length);

    switch (direction) {
      case 'forward':
        horizontalPosition += length;
        break;
      case 'up':
        depth -= length;
        break;
      case 'down':
        depth += length;
        break;
      default:
        break;
    }
  }

  console.log(horizontalPosition * depth);
}

partOne();