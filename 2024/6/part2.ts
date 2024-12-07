import {
  getExampleInput,
  getInput,
  int,
  loopFallback,
  sleep,
} from '../../util/index.ts';
import { TrackableTraversable } from '../../util/TrackableTraversable.ts';
import { type Direction } from '../../util/Traversable.ts';

// const input = getExampleInput();
const input = getInput();

type Direction90Degree = 'up' | 'right' | 'down' | 'left';

const OBSTACLE = '#';
const GUARD = '^';
const ORIGINAL_DIRECTION: Direction90Degree = 'up';
class Day6Traversable extends TrackableTraversable<string> {
  direction: Direction90Degree = 'up';
  originalPosition: [number, number];
  generatedObstaclePosition: [number, number];
  goodObstacleCounter = 0;

  constructor(input: string[][]) {
    super(input);
    for (const _idx in input) {
      const idx = int(_idx);
      const row = input[idx];
      const indexOfGuard = row.indexOf(GUARD);
      if (indexOfGuard >= 0) {
        this.originalPosition = [idx, indexOfGuard];
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
    this.clearVisitedPositions;
    this.visitedPositions.add(this.position.toString());

    const fallback = new Date().getTime() + 1000 * 5;
    while (this.peek(this.direction) !== undefined) {
      if (new Date().getTime() >= fallback) break;
      if (this.peek(this.direction) === OBSTACLE) {
        this.turn();
      } else {
        this.step(this.direction);
      }

      // Check for infinite loop
      const stringifiedPosition = this.position.toString();
      if (
        (this.position[0] === this.originalPosition[0] &&
          this.position[1] === this.originalPosition[1] &&
          this.direction === 'up') ||
        this.nonUniqueVisitedPositions.filter((p) => p === stringifiedPosition)
          .length > 10
      ) {
        console.log('Breaking early, found a loop');
        this.goodObstacleCounter++;
        break;
      }
    }
    // console.log(
    //   'Finished generating guard path with visited positions:',
    //   this.visitedPositions.size,
    // );
    return this.visitedPositions.size;
  }

  /**
   * Clears visited positions
   */
  obstacleStep(doNotReplace = false) {
    const [obRow, obCol] = this.generatedObstaclePosition;
    // Clear existing obstacle
    if (!doNotReplace) {
      this.grid[obRow][obCol] = '.';
    }
    this.goTo(obRow, obCol);
    this.step();
    if (this.here !== OBSTACLE) {
      this.placeObstacle(...this.position);
    } else {
      this.placeObstacle(...this.position);
      this.obstacleStep(true);
    }
    this.goTo(...this.originalPosition);
    this.direction = 'up';
    this.clearVisitedPositions();
  }

  placeObstacle(row: number, col: number) {
    const position: [number, number] = [row, col];
    this.generatedObstaclePosition = position;
    this.grid[row][col] = '#';
  }

  findBestObstaclePositions() {
    const fallback = loopFallback(1000);
    this.placeObstacle(0, 0);
    do {
      console.log('Trying obstacle', this.generatedObstaclePosition);
      this.generateGuardPath();
      this.obstacleStep();
    } while (
      this.generatedObstaclePosition[0] !== this.grid.length - 1 ||
      this.generatedObstaclePosition[1] !== this.row.length - 1
      // && new Date().getTime() <= fallback
    );
    return this;
  }
}

console.log(
  'good obstacle counter:',
  new Day6Traversable(
    input
      .trim()
      .split('\n')
      .map((c) => c.split('')),
  ).findBestObstaclePositions().goodObstacleCounter,
);
