export type Direction =
  | 'left'
  | 'up-left'
  | 'up'
  | 'up-right'
  | 'right'
  | 'down-right'
  | 'down'
  | 'down-left';
export const DIRECTIONS: Direction[] = [
  'left',
  'up-left',
  'up',
  'up-right',
  'right',
  'down-right',
  'down',
  'down-left',
];

export type StepDirection = Direction | 'forward' | 'backward';
export const STEP_DIRECTIONS: StepDirection[] = [
  ...DIRECTIONS,
  'forward',
  'backward',
];

/**
 * A class that represents a set of arrays as if they form a grid that can be traversed
 * in any direction: diagonally, horizontally, or vertically
 */
export class Traversable<T extends string | number> {
  _grid: T[][];
  _rowIndex: number = 0;
  _colIndex: number = 0;

  constructor(input: T[][]) {
    this._grid = input;
    this._rowIndex = 0;
    this._colIndex = 0;
  }
  get grid() {
    return this._grid;
  }

  get rowIndex() {
    return this._rowIndex;
  }
  set rowIndex(v) {
    this._rowIndex = v;
  }

  get colIndex() {
    return this._colIndex;
  }
  set colIndex(v) {
    this._colIndex = v;
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
    // console.log('row index', this.rowIndex);
    // console.log('here', this.grid[this.rowIndex]);
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
      col > this.row.length - 1 ||
      row > this.col.length - 1
    ) {
      return undefined;
    }
    this.rowIndex = row;
    this.colIndex = col;
    return this.here;
  }
}

class OutOfBoundsError extends Error {
  constructor() {
    super('Out of bounds');
  }
}
