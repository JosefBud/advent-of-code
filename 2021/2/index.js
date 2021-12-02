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

// partOne();

function partTwo() {
    let horizontalPosition = 0;
    let depth = 0;
    let aim = 0;
  
    for (instruction of INPUT) {
      let [direction, length] = instruction.split(' ');
      length = Number(length);
  
      switch (direction) {
        case 'forward':
          horizontalPosition += length;
          depth += aim * length;
          break;
        case 'up':
          aim -= length;
          break;
        case 'down':
          aim += length;
          break;
        default:
          break;
      }
    }
  
    console.log(horizontalPosition * depth);
  }
  
  partTwo();
  