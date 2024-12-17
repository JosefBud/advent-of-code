import { int } from './index.ts';
import {
  type Direction,
  type StepDirection,
  Traversable,
} from './Traversable.ts';
type MoveDirections = {
  left: string;
  up: string;
  right: string;
  down: string;
};
type CollidingTraversableOptions = {
  definitions?: {
    moveDirections?: MoveDirections;
    /**
     * Defined strings that represent a wall in the map
     * @example ['#']
     */
    walls?: string[];
    /**
     * Defined strings that represent an object that can be moved
     * @example ['O']
     */
    objects?: string[];
    /**
     * String that defines the entity moving, e.g. a "player"
     * @example '@'
     */
    movingEntity?: string;
    /**
     * String that defines an empty space
     * @example '.'
     */
    emptySpace?: string;
  };
};

export class CollidingTraversable extends Traversable<string> {
  moves: string[];
  direction: MoveDirections;
  walls: string[];
  objects: string[];
  mover: string;
  empty: string;

  constructor(
    input: string[][],
    moves: string[],
    options?: CollidingTraversableOptions,
  ) {
    super(input);
    this.direction = {
      ...(options?.definitions?.moveDirections ?? {
        left: '<',
        up: '^',
        right: '>',
        down: 'v',
      }),
    };
    this.walls = [...(options?.definitions?.walls ?? ['#'])];
    this.objects = [...(options?.definitions?.objects ?? ['O'])];
    this.mover = options?.definitions?.movingEntity ?? '@';
    this.empty = options?.definitions?.emptySpace ?? '.';

    this.moves = [...moves];
    if (!this.moves.every((m) => Object.values(this.direction).includes(m))) {
      throw new Error(
        "The characters in 'moves' don't match 'options.definitions.moveDirections'",
      );
    }

    for (const _rowIdx in input) {
      const rowIdx = int(_rowIdx);
      const row = input[rowIdx];
      const colPosition = row.indexOf(this.mover);
      if (colPosition !== -1) {
        this.rowIndex = rowIdx;
        this.colIndex = colPosition;
        break;
      }
    }
  }

  /**
   * Don't get confused by the flipped verbiage.
   * The beginning of a row references the column index.
   * The beginning of a column references the row index.
   */
  override get isBeginning() {
    return {
      ofRow:
        this.colIndex === 0 ||
        this.walls.includes(this.grid[this.rowIndex][this.colIndex - 1]),
      ofCol:
        this.rowIndex === 0 ||
        this.walls.includes(this.grid[this.rowIndex - 1][this.colIndex]),
    };
  }

  /**
   * Don't get confused by the flipped verbiage.
   * The end of a row references the column index.
   * The end of a column references the row index.
   */
  override get isEnd() {
    return {
      ofRow:
        this.colIndex === this.col.length - 1 ||
        this.walls.includes(this.grid[this.rowIndex][this.colIndex + 1]),
      ofCol:
        this.rowIndex === this.row.length - 1 ||
        this.walls.includes(this.grid[this.rowIndex + 1][this.colIndex]),
    };
  }

  /**
   * @returns empty array if there are no objects, array of object positions
   * if there is at least one object or more, and the array can end with 'undefined'
   * if the object(s) is/are against a wall
   */
  checkObjects(
    direction: Direction,
    accumulatedPositions?: Array<[number, number]>,
  ): Array<[number, number] | undefined> {
    const originalPosition = [...this.position];
    const [checkRow, checkCol] = CollidingTraversable.positionAtDirection(
      accumulatedPositions?.at(-1)?.[0] ?? this.rowIndex,
      accumulatedPositions?.at(-1)?.[1] ?? this.colIndex,
      direction,
    );
    const peek = this.peekAt(checkRow, checkCol);
    if (peek === undefined) {
      return [...(accumulatedPositions ?? []), peek];
    }
    if (this.objects.includes(peek)) {
      return this.checkObjects(direction, [
        ...(accumulatedPositions ?? []),
        [checkRow, checkCol],
      ]);
    }
    return [...(accumulatedPositions ?? [])];
  }

  moveObjects(direction: Direction, objectPositions: [number, number][]) {
    for (let i = objectPositions.length - 1; i >= 0; i--) {
      const [currRow, currCol] = objectPositions[i];
      const [newRow, newCol] = CollidingTraversable.positionAtDirection(
        currRow,
        currCol,
        direction,
      );

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow > this.grid.length - 1 ||
        newCol > this.row.length - 1 ||
        this.walls.includes(this.grid[newRow][newCol])
      ) {
        throw new Error(
          `Attempting to place object at ${currRow}, ${currCol} out of bounds`,
        );
      }
      const object = this.grid[currRow][currCol];
      this.grid[currRow][currCol] = this.empty;
      this.grid[newRow][newCol] = object;
    }
  }

  peekAt(row: number, col: number) {
    if (
      row < 0 ||
      col < 0 ||
      row > this.grid.length - 1 ||
      col > this.row.length - 1
    ) {
      return undefined;
    }
    const peek = this.grid[row][col];
    if (this.walls.includes(peek)) {
      return undefined;
    }
    return peek;
  }

  notAgainstTheWall(
    objectPositions: Array<[number, number] | undefined>,
  ): objectPositions is Array<[number, number]> {
    return Boolean(
      objectPositions.length && objectPositions.at(-1) !== undefined,
    );
  }
  /**
   * Actually changes the location.
   * At the end of a row, if `direction` isn't provided, this goes to the first column of the next row.
   */
  override step(direction: StepDirection = 'forward') {
    switch (direction) {
      case 'left':
        if (this.isBeginning.ofRow) return undefined;
        const objsLeft = this.checkObjects(direction);
        if (objsLeft.length && objsLeft.at(-1) === undefined) return undefined;
        if (this.notAgainstTheWall(objsLeft))
          this.moveObjects(direction, objsLeft);
        return this.goTo(this.rowIndex, this.colIndex - 1);
      case 'up-left':
        if (this.isBeginning.ofRow || this.isBeginning.ofCol) return undefined;
        // Ignoring object movement here
        return this.goTo(this.rowIndex - 1, this.colIndex - 1);
      case 'up':
        if (this.isBeginning.ofCol) return undefined;
        const objsUp = this.checkObjects(direction);
        if (objsUp.length && objsUp.at(-1) === undefined) return undefined;
        if (this.notAgainstTheWall(objsUp)) this.moveObjects(direction, objsUp);
        return this.goTo(this.rowIndex - 1, this.colIndex);
      case 'up-right':
        if (this.isBeginning.ofCol || this.isEnd.ofRow) return undefined;
        // Ignoring object movement here
        return this.goTo(this.rowIndex - 1, this.colIndex + 1);
      case 'right':
        if (this.isEnd.ofRow) return undefined;
        const objsRight = this.checkObjects(direction);
        if (objsRight.length && objsRight.at(-1) === undefined)
          return undefined;
        if (this.notAgainstTheWall(objsRight))
          this.moveObjects(direction, objsRight);
        return this.goTo(this.rowIndex, this.colIndex + 1);
      case 'down-right':
        if (this.isEnd.ofRow || this.isEnd.ofCol) return undefined;
        // Ignoring object movement here
        return this.goTo(this.rowIndex + 1, this.colIndex + 1);
      case 'down':
        if (this.isEnd.ofCol) return undefined;
        const objsDown = this.checkObjects(direction);
        if (objsDown.length && objsDown.at(-1) === undefined) return undefined;
        if (this.notAgainstTheWall(objsDown))
          this.moveObjects(direction, objsDown);
        return this.goTo(this.rowIndex + 1, this.colIndex);
      case 'down-left':
        if (this.isEnd.ofCol || this.isBeginning.ofRow) return undefined;
        // Ignoring object movement here
        return this.goTo(this.rowIndex + 1, this.colIndex - 1);
      case 'forward':
        if (this.isEnd.ofCol && this.isEnd.ofRow) return undefined;
        // Ignoring object movement here
        if (this.isEnd.ofRow) {
          return this.goTo(this.rowIndex + 1, 0);
        }
        return this.goTo(this.rowIndex, this.colIndex + 1);
      case 'backward':
        if (this.isBeginning.ofCol && this.isBeginning.ofRow) return undefined;
        // Ignoring object movement here
        if (this.isBeginning.ofRow) {
          return this.goTo(this.rowIndex - 1, this.row.length - 1);
        }
        return this.goTo(this.rowIndex, this.colIndex - 1);
    }
  }

  executeMoves() {
    const directions: Record<string, Direction> = {
      [this.direction.left]: 'left',
      [this.direction.up]: 'up',
      [this.direction.right]: 'right',
      [this.direction.down]: 'down',
    };
    this.moves.forEach((move) => {
      this.step(directions[move]);
    });
  }

  gpsSum() {
    return this.grid
      .map((row, rowIdx) =>
        row.reduce((prev, curr, idx) => {
          if (!this.objects.includes(curr)) {
            return prev + 0;
          }
          return prev + (100 * rowIdx + idx);
        }, 0),
      )
      .reduce((p, c) => p + c);
  }

  goTo(row: number, col: number) {
    if (
      this.grid[row][col] !== this.empty &&
      this.grid[row][col] !== this.mover
    ) {
      throw new Error("Cannot go to a space that isn't empty");
    }
    this.grid[this.rowIndex][this.colIndex] = this.empty;
    super.goTo(row, col);
    this.grid[row][col] = this.mover;
    return this.here;
  }

  static positionAtDirection(row: number, col: number, direction: Direction) {
    let atRow: number;
    let atCol: number;
    switch (direction) {
      case 'left':
        atRow = row;
        atCol = col - 1;
        break;
      case 'up-left':
        atRow = row - 1;
        atCol = col - 1;
        break;
      case 'up':
        atRow = row - 1;
        atCol = col;
        break;
      case 'up-right':
        atRow = row - 1;
        atCol = col + 1;
        break;
      case 'right':
        atRow = row;
        atCol = col + 1;
        break;
      case 'down-right':
        atRow = row + 1;
        atCol = col + 1;
        break;
      case 'down':
        atRow = row + 1;
        atCol = col;
        break;
      case 'down-left':
        atRow = row + 1;
        atCol = col - 1;
        break;
    }
    return [atRow, atCol];
  }
}
