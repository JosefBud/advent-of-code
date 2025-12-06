import { Traversable, DIRECTIONS } from '../../util/Traversable.ts';

export class PaperRollTraversable<
  T extends string | number,
> extends Traversable<T> {
  constructor(input: T[][]) {
    super(input);
  }

  lookAround(): [
    T | undefined,
    T | undefined,
    T | undefined,
    T | undefined,
    T | undefined,
    T | undefined,
    T | undefined,
    T | undefined,
  ] {
    return DIRECTIONS.map((d) => this.peek(d)) as any;
  }
}
