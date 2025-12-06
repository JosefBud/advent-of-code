import { describe, it } from 'node:test';
import a from 'node:assert';
import { PaperRollTraversable } from './PaperRollTraversable.ts';

describe('PaperRollTraversable', () => {
  describe('lookAround', () => {
    const square = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const U = undefined;
    it('should find the eight cells around it', () => {
      const map = new PaperRollTraversable(square);
      map.goTo(1, 1);
      a.strictEqual(map.here, 5);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([4, 1, 2, 3, 6, 9, 8, 7]),
      );
    });

    it('should find cells around a corner', () => {
      const map = new PaperRollTraversable(square);
      a.strictEqual(map.here, 1);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([U, U, U, U, 2, 5, 4, U]),
      );

      map.goTo(0, 2);
      a.strictEqual(map.here, 3);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([2, U, U, U, U, U, 6, 5]),
      );

      map.goTo(2, 2);
      a.strictEqual(map.here, 9);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([8, 5, 6, U, U, U, U, U]),
      );

      map.goTo(2, 0);
      a.strictEqual(map.here, 7);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([U, U, 4, 5, 8, U, U, U]),
      );
    });

    it('should find cells around an edge', () => {
      const map = new PaperRollTraversable(square);

      map.goTo(0, 1);
      a.strictEqual(map.here, 2);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([1, U, U, U, 3, 6, 5, 4]),
      );

      map.goTo(1, 2);
      a.strictEqual(map.here, 6);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([5, 2, 3, U, U, U, 9, 8]),
      );

      map.goTo(2, 1);
      a.strictEqual(map.here, 8);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([7, 4, 5, 6, 9, U, U, U]),
      );

      map.goTo(1, 0);
      a.strictEqual(map.here, 4);
      a.strictEqual(
        JSON.stringify(map.lookAround()),
        JSON.stringify([U, U, 1, 2, 5, 8, 7, U]),
      );
    });
  });
});
