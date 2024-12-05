import { int } from './index.ts';

type Direction =
  | 'left'
  | 'up-left'
  | 'up'
  | 'up-right'
  | 'right'
  | 'down-right'
  | 'down'
  | 'down-left';
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

type StepDirection = Direction | 'forward' | 'backward';
const STEP_DIRECTIONS: StepDirection[] = [...DIRECTIONS, 'forward', 'backward'];

/**
 * A class that represents a set of arrays as if they form a grid that can be traversed
 * in any direction: diagonally, horizontally, or vertically
 */
export class Traversable<T extends string | number> {
  grid: T[][];
  rowIndex: number = 0;
  colIndex: number = 0;

  constructor(input: T[][]) {
    this.grid = input;
  }

  get row() {
    return this.grid[this.rowIndex];
  }

  get col() {
    return this.grid.map((row) => row[this.colIndex]);
  }

  get position(): [number, number] {
    return [this.rowIndex, this.colIndex];
  }

  get here() {
    return this.grid[this.rowIndex][this.colIndex];
  }

  /**
   * Don't get confused by the flipped verbiage.
   * The beginning of a row references the column index.
   * The beginning of a column references the row index.
   */
  get isBeginning() {
    return {
      ofRow: this.colIndex === 0,
      ofCol: this.rowIndex === 0,
    };
  }

  /**
   * Don't get confused by the flipped verbiage.
   * The end of a row references the column index.
   * The end of a column references the row index.
   */
  get isEnd() {
    return {
      ofRow: this.colIndex === this.col.length - 1,
      ofCol: this.rowIndex === this.row.length - 1,
    };
  }

  peek(direction: Direction) {
    switch (direction) {
      case 'left':
        if (this.isBeginning.ofRow) return undefined;
        return this.row[this.colIndex - 1];
      case 'up-left':
        if (this.isBeginning.ofRow || this.isBeginning.ofCol) return undefined;
        return this.grid[this.rowIndex - 1][this.colIndex - 1];
      case 'up':
        if (this.isBeginning.ofCol) return undefined;
        return this.col[this.rowIndex - 1];
      case 'up-right':
        if (this.isBeginning.ofCol || this.isEnd.ofRow) return undefined;
        return this.grid[this.rowIndex - 1][this.colIndex + 1];
      case 'right':
        if (this.isEnd.ofRow) return undefined;
        return this.row[this.colIndex + 1];
      case 'down-right':
        if (this.isEnd.ofRow || this.isEnd.ofCol) return undefined;
        return this.grid[this.rowIndex + 1][this.colIndex + 1];
      case 'down':
        if (this.isEnd.ofCol) return undefined;
        return this.col[this.rowIndex + 1];
      case 'down-left':
        if (this.isEnd.ofCol || this.isBeginning.ofRow) return undefined;
        return this.grid[this.rowIndex + 1][this.colIndex - 1];
    }
  }

  /**
   * Actually changes the location.
   * At the end of a row, if `direction` isn't provided, this goes to the first column of the next row.
   */
  step(direction: StepDirection = 'forward') {
    switch (direction) {
      case 'left':
        if (this.isBeginning.ofRow) return undefined;
        this.colIndex--;
        return this.here;
      case 'up-left':
        if (this.isBeginning.ofRow || this.isBeginning.ofCol) return undefined;
        this.colIndex--;
        this.rowIndex--;
        return this.here;
      case 'up':
        if (this.isBeginning.ofCol) return undefined;
        this.rowIndex--;
        return this.here;
      case 'up-right':
        if (this.isBeginning.ofCol || this.isEnd.ofRow) return undefined;
        this.rowIndex--;
        this.colIndex++;
        return this.here;
      case 'right':
        if (this.isEnd.ofRow) return undefined;
        this.colIndex++;
        return this.here;
      case 'down-right':
        if (this.isEnd.ofRow || this.isEnd.ofCol) return undefined;
        this.colIndex++;
        this.rowIndex++;
        return this.here;
      case 'down':
        if (this.isEnd.ofCol) return undefined;
        this.rowIndex++;
        return this.here;
      case 'down-left':
        if (this.isEnd.ofCol || this.isBeginning.ofRow) return undefined;
        this.rowIndex++;
        this.colIndex--;
        return this.here;
      case 'forward':
        if (this.isEnd.ofCol && this.isEnd.ofRow) return undefined;
        if (this.isEnd.ofRow) {
          this.rowIndex++;
          this.colIndex = 0;
          return this.here;
        }
        this.colIndex++;
        return this.here;
      case 'backward':
        if (this.isBeginning.ofCol && this.isBeginning.ofRow) return undefined;
        if (this.isBeginning.ofRow) {
          this.rowIndex--;
          this.colIndex = this.row.length - 1;
          return this.here;
        }
        this.colIndex--;
        return this.here;
    }
  }

  goTo(row: number, col: number) {
    if (
      row < 0 ||
      col < 0 ||
      row > this.row.length - 1 ||
      col > this.col.length - 1
    ) {
      return undefined;
    }
    this.rowIndex = row;
    this.colIndex = col;
    return this.here;
  }
}

export class SearchableTraversable<
  T extends string | number,
> extends Traversable<T> {
  constructor(input: T[][]) {
    super(input);
  }

  search(value: T): number {
    let occurrences = 0;
    const searchCharacters =
      typeof value === 'number'
        ? value.toString().split('').map(Number)
        : value.split('');

    let positionStore: [number, number] = [0, 0];
    let fallback = new Date().getTime() + 1000 * 10;
    while (true) {
      if (new Date().getTime() >= fallback) {
        break;
      }
      if (this.here !== searchCharacters[0]) {
        const next = this.step();
        if (next === undefined) break;
        continue;
      }

      const validDirections = DIRECTIONS.filter(
        (d) =>
          this.peek(d) !== undefined && this.peek(d) === searchCharacters[1],
      );

      if (!validDirections.length) {
        const next = this.step();
        if (next === undefined) break;
        continue;
      }

      // Store current position before stepping off into multiple directions
      positionStore = this.position;
      for (const dir of validDirections) {
        this.goTo(...positionStore);
        this.step(dir);
        const remainingCharacters = searchCharacters.slice(2);
        let success = false;
        for (const _idx in remainingCharacters) {
          const idx = int(_idx);
          const char = remainingCharacters[idx];
          const next = this.step(dir);
          if (next === undefined || next !== char) break;
          if (next === char && idx === remainingCharacters.length - 1) {
            success = true;
          }
        }

        if (success) {
          occurrences++;
        }
      }
      this.goTo(...positionStore);
      const next = this.step();
      if (next === undefined) break;
    }

    return occurrences;
  }

  searchX(value: T) {
    let occurrences = 0;
    const searchCharacters =
      typeof value === 'number'
        ? value.toString().split('').map(Number)
        : value.split('');

    if (searchCharacters.length % 2 === 0) {
      throw new Error('searchX value must be an odd number of characters');
    }
    const centerIdx = (1 + searchCharacters.length) / 2 - 1;
    const centerChar = searchCharacters[centerIdx];
    let positionStore: [number, number] = [0, 0];
    let fallback = new Date().getTime() + 1000 * 10;
    this.goTo(1, 1);
    while (true) {
      if (new Date().getTime() >= fallback) {
        break;
      }
      if (this.here !== centerChar) {
        const next = this.step();
        if (next === undefined) break;
        continue;
      }

      const prevChar = searchCharacters[centerIdx - 1];
      const nextChar = searchCharacters[centerIdx + 1];
      if (
        (this.peek('up-left') === prevChar &&
          this.peek('down-right') === nextChar &&
          this.peek('down-left') === prevChar &&
          this.peek('up-right') === nextChar) ||
        (this.peek('up-left') === nextChar &&
          this.peek('down-right') === prevChar &&
          this.peek('down-left') === nextChar &&
          this.peek('up-right') === prevChar) ||
        (this.peek('up-left') === prevChar &&
          this.peek('down-right') === nextChar &&
          this.peek('down-left') === nextChar &&
          this.peek('up-right') === prevChar) ||
        (this.peek('up-left') === nextChar &&
          this.peek('down-right') === prevChar &&
          this.peek('down-left') === prevChar &&
          this.peek('up-right') === nextChar)
      ) {
        occurrences++;
      }
      const next = this.step();
      if (next === undefined) break;
    }
    return occurrences;
  }
}

class OutOfBoundsError extends Error {
  constructor() {
    super('Out of bounds');
  }
}
