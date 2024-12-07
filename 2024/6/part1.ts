import { getExampleInput, getInput, int, sleep } from '../../util/index.ts';
import { TrackableTraversable } from '../../util/TrackableTraversable.ts';
import { type Direction } from '../../util/Traversable.ts';

// const input = getExampleInput();
const input = getInput();

type Direction90Degree = 'up' | 'right' | 'down' | 'left';

const OBSTACLE = '#';
const GUARD = '^';
class Day6Traversable extends TrackableTraversable<string> {
  direction: Direction90Degree = 'up';

  constructor(input: string[][]) {
    super(input);
    for (const _idx in input) {
      const idx = int(_idx);
      const row = input[idx];
      const indexOfGuard = row.indexOf(GUARD);
      if (indexOfGuard >= 0) {
        this.goTo(idx, indexOfGuard);
        break;
      }
    }
  }

  turn() {
    switch (this.direction) {
      case 'up':
        this.direction = 'right';
        break;
      case 'right':
        this.direction = 'down';
        break;
      case 'down':
        this.direction = 'left';
        break;
      case 'left':
        this.direction = 'up';
        break;
    }
  }

  generateGuardPath() {
    this.clearVisitedPositions();
    this.visitedPositions.add(this.position.toString());
    const fallback = new Date().getTime() + 1000 * 5;
    while (this.peek(this.direction) !== undefined) {
      if (new Date().getTime() >= fallback) break;
      if (this.peek(this.direction) === OBSTACLE) {
        this.turn();
      } else {
        this.step(this.direction);
      }
    }
    return this.visitedPositions.size;
  }
}

console.log(
  new Day6Traversable(
    input
      .trim()
      .split('\n')
      .map((c) => c.split('')),
  ).generateGuardPath(),
);
