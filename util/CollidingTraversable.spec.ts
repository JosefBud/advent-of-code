import { describe, it } from 'node:test';
import a from 'node:assert/strict';
import { CollidingTraversable } from './CollidingTraversable.ts';
import { type Direction } from './Traversable.ts';

describe('CollidingTraversable', () => {
  describe('isBeginning && isEnd', () => {
    it('Should detect walls', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      map.goTo(1, 1);
      a.equal(map.isBeginning.ofRow, true);
      a.equal(map.isBeginning.ofCol, true);
      map.step('right');
      a.equal(map.isBeginning.ofRow, false);
      a.equal(map.isBeginning.ofCol, true);
      map.step('down');
      a.equal(map.isBeginning.ofRow, false);
      a.equal(map.isBeginning.ofCol, false);

      map.goTo(8, 8);
      a.equal(map.isEnd.ofRow, true);
      a.equal(map.isEnd.ofCol, true);
      map.step('backward');
      a.equal(map.isEnd.ofRow, false);
      a.equal(map.isEnd.ofCol, true);
      map.step('up-left');
      a.equal(map.isEnd.ofRow, false);
      a.equal(map.isEnd.ofCol, false);
    });
  });

  describe('goTo', () => {
    it('Moves the moving entity', () => {
      const map = new CollidingTraversable([['.', '.', '@', '.', '.']], ['<']);
      map.goTo(0, 0);
      a.deepEqual(map.grid, [['@', '.', '.', '.', '.']]);
      map.goTo(0, 4);
      a.deepEqual(map.grid, [['.', '.', '.', '.', '@']]);

      a.throws(() => map.goTo(1, 1), "Cannot go to a space that isn't empty");
    });
  });

  describe('override step', () => {
    it('Should step correctly to empty spaces', () => {
      const trav = new CollidingTraversable(TEST_GRID, ['<']);
      a.equal(trav.grid[3][4], '.');
      a.equal(trav.grid[4][4], '@');
      trav.step('up');
      a.equal(trav.grid[3][4], '@');
      a.equal(trav.grid[4][4], '.');

      trav.step('right');
      a.equal(trav.grid[3][4], '.');
      a.equal(trav.grid[3][5], '@');

      trav.step('down');
      a.equal(trav.grid[3][5], '.');
      a.equal(trav.grid[4][5], '@');

      trav.step('left');
      a.equal(trav.grid[4][5], '.');
      a.equal(trav.grid[4][4], '@'); // back where we started

      trav.step('forward');
      a.equal(trav.grid[4][4], '.');
      a.equal(trav.grid[4][5], '@');

      trav.step('backward');
      a.equal(trav.grid[4][5], '.');
      a.equal(trav.grid[4][4], '@'); // back where we started

      trav.step('up-right');
      a.equal(trav.grid[4][4], '.');
      a.equal(trav.grid[3][5], '@');

      trav.step('down-left');
      a.equal(trav.grid[3][5], '.');
      a.equal(trav.grid[4][4], '@'); // back where we started

      trav.step();
      trav.step('down-right');
      a.equal(trav.grid[4][4], '.');
      a.equal(trav.grid[4][5], '.');
      a.equal(trav.grid[5][6], '@');

      trav.step('up-left');
      a.equal(trav.grid[5][6], '.');
      a.equal(trav.grid[4][5], '@');
    });

    it('Should move objects with steps', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      map.step('left');
      a.equal(map.grid[4][4], '.');
      a.equal(map.grid[4][3], '@');
      a.equal(map.grid[4][2], 'O');

      map.step('left');
      a.equal(map.grid[4][3], '.');
      a.equal(map.grid[4][2], '@');
      a.equal(map.grid[4][1], 'O');
      a.equal(map.grid[4][0], '#');

      // No moving against a wall
      map.step('left');
      a.equal(map.grid[4][3], '.');
      a.equal(map.grid[4][2], '@');
      a.equal(map.grid[4][1], 'O');
      a.equal(map.grid[4][0], '#');

      map.step('up-left');
      a.equal(map.grid[3][1], '@');
      map.step('right');
      a.equal(map.grid[3][1], '.');
      a.equal(map.grid[3][2], '@');
      a.equal(map.grid[3][3], 'O');
      a.equal(map.grid[3][4], 'O');
      map.step('right');
      a.equal(map.grid[3][2], '.');
      a.equal(map.grid[3][3], '@');
      a.equal(map.grid[3][4], 'O');
      a.equal(map.grid[3][5], 'O');
      a.equal(map.grid[3][6], 'O');
      map.step('right');
      a.equal(map.grid[3][3], '.');
      a.equal(map.grid[3][4], '@');
      a.equal(map.grid[3][5], 'O');
      a.equal(map.grid[3][6], 'O');
      a.equal(map.grid[3][7], 'O');
      a.equal(map.grid[3][8], 'O');
      // No moving against a wall
      map.step('right');
      a.equal(map.grid[3][4], '@');
      a.equal(map.grid[3][8], 'O');
    });
  });

  describe('executeMoves', () => {
    it('Executes the move set passed in', () => {
      const map = new CollidingTraversable(TEST_GRID, '<<<<^^>v'.split(''));
      map.executeMoves();
      // prettier-ignore
      {
        a.deepEqual(map.grid[1], ['#', '.', 'O', 'O', '.', '.', 'O', '.', 'O', '#'])
        a.deepEqual(map.grid[3], ['#', '.', '.', '@', '.', '.', 'O', '.', 'O', '#'])
        a.deepEqual(map.grid[4], ['#', 'O', '.', 'O', '.', '.', '.', 'O', '.', '#'])
      }
    });
  });

  describe('gpsSum', () => {
    it('Sums the GPS coordinates', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      map.gpsSum();
    });
  });

  describe('peekAt', () => {
    it('Returns the right results', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      a.deepEqual(map.peekAt(1, 8), 'O');
      a.deepEqual(map.peekAt(3, 2), 'O');
      a.deepEqual(map.peekAt(-1, 0), undefined);
      a.deepEqual(map.peekAt(0, 10), undefined);
      a.deepEqual(map.peekAt(0, 0), undefined);
    });
  });

  describe('checkObjects', () => {
    it('Checks objects', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      a.deepEqual(map.checkObjects('left'), [[4, 3]]);

      map.step('up');
      a.deepEqual(map.checkObjects('left'), [
        [3, 3],
        [3, 2],
      ]);

      map.step('up-left');
      a.deepEqual(map.checkObjects('up'), [[1, 3], undefined]);
    });

    it('Handles all directions', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      map.grid[map.rowIndex - 1][map.colIndex] = 'O';
      map.grid[map.rowIndex - 1][map.colIndex + 1] = 'O';
      map.grid[map.rowIndex][map.colIndex + 1] = 'O';
      map.grid[map.rowIndex + 1][map.colIndex] = 'O';
      map.grid[map.rowIndex + 1][map.colIndex - 1] = 'O';

      DIRECTIONS.forEach((direction) => {
        a.equal(map.peek(direction as Direction), 'O');
      });
      a.deepEqual(map.checkObjects('left'), [[4, 3]]);
      a.deepEqual(map.checkObjects('up-left'), [[3, 3]]);
      a.deepEqual(map.checkObjects('up'), [[3, 4]]);
      a.deepEqual(map.checkObjects('up-right'), [[3, 5]]);
      a.deepEqual(map.checkObjects('right'), [[4, 5]]);
      a.deepEqual(map.checkObjects('down-right'), [[5, 5]]);
      a.deepEqual(map.checkObjects('down'), [
        [5, 4],
        [6, 4],
      ]);
      a.deepEqual(map.checkObjects('down-left'), [[5, 3]]);
    });
  });

  describe('moveObjects', () => {
    it('Moves objects', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      map.moveObjects('left', [[4, 3]]);
      a.equal(map.grid[4][3], '.');
      a.equal(map.grid[4][2], 'O');

      map.moveObjects('right', [
        [3, 2],
        [3, 3],
      ]);
      a.equal(map.grid[3][2], '.');
      a.equal(map.grid[3][3], 'O');
      a.equal(map.grid[3][4], 'O');

      map.moveObjects('down', [
        [5, 1],
        [6, 1],
      ]);
      a.equal(map.grid[5][1], '.');
      a.equal(map.grid[6][1], 'O');
      a.equal(map.grid[7][1], 'O');
    });

    it('Throws when attempting to move objects out of bounds', () => {
      const map = new CollidingTraversable(TEST_GRID, ['<']);
      a.throws(
        () => map.moveObjects('up', [[1, 8]]),
        new Error('Attempting to place object at 1, 8 out of bounds'),
      );
      a.throws(
        () =>
          map.moveObjects('down', [
            [8, 5],
            [7, 5],
          ]),
        new Error('Attempting to place object at 8, 5 out of bounds'),
      );
    });
  });
});

const DIRECTIONS: Direction[] = [
  'left',
  'up-left',
  'up',
  'up-right',
  'right',
  'down-right',
  'down',
  'down-left',
];
const TEST_GRID = [
  //0    1    2    3    4    5    6    7    8    9
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], // 0
  ['#', '.', '.', 'O', '.', '.', 'O', '.', 'O', '#'], // 1
  ['#', '.', '.', '.', '.', '.', '.', 'O', '.', '#'], // 2
  ['#', '.', 'O', 'O', '.', '.', 'O', '.', 'O', '#'], // 3
  ['#', '.', '.', 'O', '@', '.', '.', 'O', '.', '#'], // 4
  ['#', 'O', '#', '.', '.', 'O', '.', '.', '.', '#'], // 5
  ['#', 'O', '.', '.', 'O', '.', '.', 'O', '.', '#'], // 6
  ['#', '.', 'O', 'O', '.', 'O', '.', 'O', 'O', '#'], // 7
  ['#', '.', '.', '.', '.', 'O', '.', '.', '.', '#'], // 8
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'], // 9
];
