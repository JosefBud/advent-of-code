import { int } from './index.ts';
import { DIRECTIONS, Traversable } from './Traversable.ts';

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
