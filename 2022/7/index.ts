// @ts-ignore
const [input, testInput]: [string, string] = require('./input');

const inputArray = input.split('\n');

type FSStruct = {
  [key: string]: FSStruct | number;
}

const fileSystem: FSStruct = {
  '/': {},
};

let currentLocation = fileSystem;
const currentLocationPath: string[] = [];

for (const line of inputArray) {
  const words = line.split(' ');

  // Command ran
  if (words[0] === '$') {
    const command = words[1];

    // Change directory
    if (command === 'cd') {
      const location = words[2];

      // Go back
      if (location === '..') {
        currentLocationPath.pop();
        currentLocation = fileSystem;
        for (const dir of currentLocationPath) {
          currentLocation = (currentLocation[dir] as FSStruct);
        }
      } else {
        currentLocationPath.push(location);
        currentLocation = (currentLocation[location] as FSStruct);
      }
    }
  } else if (words[0] === 'dir') {
    const dirName = words[1];
    currentLocation[dirName] = {};
  } else {
    const fileSize = Number(words[0]);
    const fileName = words[1];
    currentLocation[fileName] = fileSize;
  }
}

const TOTAL_SPACE = 70000000;
const NEEDED_SPACE = 30000000;

let totalSize = 0;
const deleteableDirs: number[] = [];

const getDirectorySize = (dir: FSStruct, freeSpace?: number): number => {
  let size = 0;

  for (const [fileName, fileValue] of Object.entries(dir)) {
    if (typeof fileValue === 'number') {
      size += fileValue
    } else {
      const dirSize = getDirectorySize(fileValue, freeSpace);
      if (freeSpace && dirSize > NEEDED_SPACE - freeSpace) {
        deleteableDirs.push(dirSize);
      }
      size += dirSize;
    }
  }

  return size;
}

const currentFreeSpace = TOTAL_SPACE - getDirectorySize(fileSystem);

getDirectorySize(fileSystem, currentFreeSpace);

console.log(deleteableDirs.sort((a, b) => a - b)[0]); // Part 2