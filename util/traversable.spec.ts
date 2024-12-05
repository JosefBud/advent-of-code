import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SearchableTraversable, Traversable } from './traversable.ts';

describe('Traversable', () => {
  it('Should correctly go to positions, and throw if out of bounds', () => {
    const trav = new Traversable(TEST_GRID);
    assert.strictEqual(trav.here, 0);
    assert.strictEqual(trav.goTo(3, 4), 34);
    assert.strictEqual(trav.here, TEST_GRID[3][4]);
    assert.strictEqual(trav.here, 34);
    assert.strictEqual(trav.rowIndex, 3);
    assert.strictEqual(trav.colIndex, 4);

    assert.strictEqual(trav.goTo(-1, 0), undefined);
    assert.strictEqual(trav.goTo(0, -1), undefined);
    assert.strictEqual(trav.goTo(-1, -1), undefined);
    assert.strictEqual(trav.goTo(6, 2), undefined);
    assert.strictEqual(trav.goTo(2, 6), undefined);
    assert.strictEqual(trav.goTo(6, 6), undefined);
  });

  it('Should return the correct rows and columns', () => {
    const trav = new Traversable(TEST_GRID);
    assert.strictEqual(trav.here, 0);
    assert.deepEqual(trav.row, [0, 1, 2, 3, 4, 5]);
    assert.deepEqual(trav.col, [0, 10, 20, 30, 40, 50]);

    assert.strictEqual(trav.goTo(2, 2), 22);
    assert.deepEqual(trav.here, 22);
    assert.deepEqual(trav.row, [20, 21, 22, 23, 24, 25]);
    assert.deepEqual(trav.col, [2, 12, 22, 32, 42, 52]);

    assert.strictEqual(trav.goTo(5, 1), 51);
    assert.deepEqual(trav.here, 51);
    assert.deepEqual(trav.row, [50, 51, 52, 53, 54, 55]);
    assert.deepEqual(trav.col, [1, 11, 21, 31, 41, 51]);
  });

  it('Should correctly discern if current location is at beginning or end of a row or column', () => {
    const trav = new Traversable(TEST_GRID);
    assert.strictEqual(trav.here, 0);
    assert.strictEqual(trav.isBeginning.ofCol, true);
    assert.strictEqual(trav.isBeginning.ofRow, true);
    assert.strictEqual(trav.isEnd.ofCol, false);
    assert.strictEqual(trav.isEnd.ofRow, false);

    trav.goTo(0, 5);
    assert.strictEqual(trav.here, 5);
    assert.strictEqual(trav.isBeginning.ofCol, true);
    assert.strictEqual(trav.isBeginning.ofRow, false);
    assert.strictEqual(trav.isEnd.ofCol, false);
    assert.strictEqual(trav.isEnd.ofRow, true);

    trav.goTo(5, 0);
    assert.strictEqual(trav.here, 50);
    assert.strictEqual(trav.isBeginning.ofCol, false);
    assert.strictEqual(trav.isBeginning.ofRow, true);
    assert.strictEqual(trav.isEnd.ofCol, true);
    assert.strictEqual(trav.isEnd.ofRow, false);

    trav.goTo(5, 5);
    assert.strictEqual(trav.here, 55);
    assert.strictEqual(trav.isBeginning.ofCol, false);
    assert.strictEqual(trav.isBeginning.ofRow, false);
    assert.strictEqual(trav.isEnd.ofCol, true);
    assert.strictEqual(trav.isEnd.ofRow, true);

    trav.goTo(3, 3);
    assert.strictEqual(trav.here, 33);
    assert.strictEqual(trav.isBeginning.ofCol, false);
    assert.strictEqual(trav.isBeginning.ofRow, false);
    assert.strictEqual(trav.isEnd.ofCol, false);
    assert.strictEqual(trav.isEnd.ofRow, false);
  });

  it('Should peek correctly, and throw when peeking out of bounds', () => {
    const trav = new Traversable(TEST_GRID);
    assert.strictEqual(trav.here, 0);
    trav.goTo(0, 5);
    assert.strictEqual(trav.here, 5);
    assert.strictEqual(trav.peek('right'), undefined);
    assert.strictEqual(trav.peek('up'), undefined);
    assert.strictEqual(trav.peek('up-right'), undefined);
    assert.strictEqual(trav.peek('up-left'), undefined);
    assert.strictEqual(trav.peek('down-right'), undefined);
    assert.strictEqual(trav.peek('left'), 4);
    assert.strictEqual(trav.peek('down-left'), 14);
    assert.strictEqual(trav.peek('down'), 15);

    trav.goTo(5, 0);
    assert.strictEqual(trav.here, 50);
    assert.strictEqual(trav.peek('left'), undefined);
    assert.strictEqual(trav.peek('down'), undefined);
    assert.strictEqual(trav.peek('down-left'), undefined);
    assert.strictEqual(trav.peek('down-right'), undefined);
    assert.strictEqual(trav.peek('up-left'), undefined);
    assert.strictEqual(trav.peek('up'), 40);
    assert.strictEqual(trav.peek('up-right'), 41);
    assert.strictEqual(trav.peek('right'), 51);
  });

  it('Should step correctly, and throw when stepping out of bounds', () => {
    const trav = new Traversable(TEST_GRID);
    assert.strictEqual(trav.here, 0);
    assert.strictEqual(trav.step('backward'), undefined);
    assert.strictEqual(trav.step('left'), undefined);
    assert.strictEqual(trav.step('up-left'), undefined);
    assert.strictEqual(trav.step('up'), undefined);
    assert.strictEqual(trav.step('up-right'), undefined);

    assert.strictEqual(trav.step(), 1);
    assert.strictEqual(trav.here, 1);
    assert.strictEqual(trav.step(), 2);
    assert.strictEqual(trav.here, 2);
    assert.strictEqual(trav.step('backward'), 1);
    assert.strictEqual(trav.here, 1);
    assert.strictEqual(trav.step('up'), undefined);
    assert.strictEqual(trav.step(), 2);
    assert.strictEqual(trav.here, 2);
    assert.strictEqual(trav.step(), 3);
    assert.strictEqual(trav.here, 3);
    assert.strictEqual(trav.step(), 4);
    assert.strictEqual(trav.here, 4);
    assert.strictEqual(trav.step(), 5);
    assert.strictEqual(trav.here, 5);
    assert.strictEqual(trav.step(), 10);
    assert.strictEqual(trav.here, 10);
    assert.strictEqual(trav.step(), 11);
    assert.strictEqual(trav.here, 11);

    assert.strictEqual(trav.step('up'), 1);
    assert.strictEqual(trav.step('down'), 11);
    assert.strictEqual(trav.step('right'), 12);
    assert.strictEqual(trav.step('down-right'), 23);
    assert.strictEqual(trav.step('down-left'), 32);
    assert.strictEqual(trav.step('down'), 42);
    assert.strictEqual(trav.step(), 43);
    assert.strictEqual(trav.step('left'), 42);
    assert.strictEqual(trav.step('up-left'), 31);
    assert.strictEqual(trav.step('up-right'), 22);
    assert.strictEqual(trav.step('backward'), 21);
    assert.strictEqual(trav.step('backward'), 20);
    assert.strictEqual(trav.step('backward'), 15);

    trav.goTo(0, 0);
    assert.strictEqual(trav.step('backward'), undefined);
    assert.strictEqual(trav.step('left'), undefined);
    assert.strictEqual(trav.step('up-left'), undefined);
    assert.strictEqual(trav.step('up'), undefined);
    assert.strictEqual(trav.step('up-right'), undefined);
    assert.strictEqual(trav.step('down-left'), undefined);
    trav.goTo(5, 5);
    assert.strictEqual(trav.step(), undefined);
    assert.strictEqual(trav.step('down'), undefined);
    assert.strictEqual(trav.step('down-left'), undefined);
    assert.strictEqual(trav.step('down-right'), undefined);
    assert.strictEqual(trav.step('right'), undefined);
    assert.strictEqual(trav.step('up-right'), undefined);
  });
});

describe('SearchableTraversable', () => {
  it('Should return the correct number of occurrences for searching the example input', () => {
    const searchable = new SearchableTraversable(EXAMPLE_INPUT);
    assert.strictEqual(searchable.search('XMAS'), 18);
  });

  it('Should return the correct number of occurrences for "X"-searching the example input', () => {
    const searchable = new SearchableTraversable(EXAMPLE_INPUT);
    assert.strictEqual(searchable.searchX('MAS'), 9);
  });
});

const TEST_GRID: number[][] = [
  // prettier-ignore
  [ 0,  1,  2,  3,  4,  5], // 0
  [10, 11, 12, 13, 14, 15], // 1
  [20, 21, 22, 23, 24, 25], // 2
  [30, 31, 32, 33, 34, 35], // 3
  [40, 41, 42, 43, 44, 45], // 4
  [50, 51, 52, 53, 54, 55], // 5
];

const EXAMPLE_INPUT: string[][] = [
  'MMMSXXMASM'.split(''),
  'MSAMXMSMSA'.split(''),
  'AMXSXMAAMM'.split(''),
  'MSAMASMSMX'.split(''),
  'XMASAMXAMM'.split(''),
  'XXAMMXXAMA'.split(''),
  'SMSMSASXSS'.split(''),
  'SAXAMASAAA'.split(''),
  'MAMMMXMMMM'.split(''),
  'MXMXAXMASX'.split(''),
];
