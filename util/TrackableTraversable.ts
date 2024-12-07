import { SearchableTraversable } from './SearchableTraversable.ts';

export class TrackableTraversable<
  T extends string | number,
> extends SearchableTraversable<T> {
  visitedPositions: Set<string> = new Set();
  nonUniqueVisitedPositions: string[] = [];

  constructor(input: T[][]) {
    super(input);
  }

  get rowIndex() {
    return super.rowIndex;
  }
  override set rowIndex(v: number) {
    super.rowIndex = v;
    this.addToVisitedPositions();
  }

  get colIndex() {
    return super.colIndex;
  }
  override set colIndex(v: number) {
    super.colIndex = v;
    this.addToVisitedPositions();
  }

  addToVisitedPositions() {
    if (this.position.every((p) => p !== undefined)) {
      this.visitedPositions.add(this.position.toString());
      this.nonUniqueVisitedPositions.push(this.position.toString());
    }
  }

  clearVisitedPositions() {
    this.visitedPositions.clear();
    this.nonUniqueVisitedPositions = [];
  }
}
