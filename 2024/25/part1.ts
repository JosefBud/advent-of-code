import { getExampleInput, getInput } from '../../util/index.ts';

type Point = '#' | '.';
type SchematicRow = [Point, Point, Point, Point, Point];
type Schematic = [
  SchematicRow,
  SchematicRow,
  SchematicRow,
  SchematicRow,
  SchematicRow,
];
const isSchematic = (input: string[][]): input is Schematic => {
  if (
    input.some((i) => i.length !== 5 || i.some((p) => p !== '#' && p !== '.'))
  ) {
    throw new Error(`${input} is not a schematic`);
  }
  return true;
};

// const input = getExampleInput();
const input = getInput();

const schematics = input.trim().split('\n\n');

const splitEntries: Array<[string, Schematic]> = schematics.map((schematic) => {
  const convertedSchematic = schematic.split('\n').map((s) => s.split(''));
  if (!isSchematic(convertedSchematic)) {
    throw new Error(`Neither key nor lock in ${schematic}`);
  }
  if (schematic.startsWith('#####')) {
    return ['locks', convertedSchematic];
  } else if (schematic.endsWith('#####')) {
    return ['keys', convertedSchematic];
  } else {
    throw new Error(`Neither key nor lock in ${schematic}`);
  }
});

const getHeight = (schematic: Schematic, type: 'key' | 'lock') => {
  const heights: number[] = [];

  for (let col = 0; col < 5; col++) {
    let height = -1;
    for (const row of schematic) {
      if (row[col] === '#') {
        height++;
      }
    }
    if (height === -1) {
      throw new Error(`No counts on schematic ${schematic} column ${col}`);
    }
    heights.push(height);
  }

  return heights;
};
const getLockHeight = (s: Schematic) => getHeight(s, 'lock');
const getKeyHeight = (s: Schematic) => getHeight(s, 'key');

const locks = splitEntries
  .filter((e) => e[0] === 'locks')
  .map((e) => e[1])
  .map(getLockHeight);
const keys = splitEntries
  .filter((e) => e[0] === 'keys')
  .map((e) => e[1])
  .map(getKeyHeight);

let numOfPairs = 0;
for (const key of keys) {
  // console.log(`${key}`);
  for (const lock of locks) {
    let compatible = true;
    for (const _idx in key) {
      const idx = Number(_idx);
      const keyHeight = key[idx];
      const lockHeight = lock[idx];
      if (keyHeight + lockHeight > 5) {
        compatible = false;
      }
    }
    if (compatible) {
      numOfPairs++;
    }
  }
}

console.log(numOfPairs);
