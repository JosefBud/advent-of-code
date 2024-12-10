import { getExampleInput, getInput, int, stringify } from '../../util/index.ts';
import { Traversable } from '../../util/Traversable.ts';

const input = getExampleInput();
// const input = getInput();

const iAmCurrentlyHittingTheGriddyForUkraine = input
  .trim()
  .split('\n')
  .map((v) => v.split('').map(int));

class HikingTraversable extends Traversable<number> {
  constructor(grid: number[][]) {
    super(grid);
  }
  validTrails: number = 0;
  validTrailEndLocations: Map<string, string[]> = new Map();

  getTrailheads() {
    let positions: [number, number][] = [];
    this.grid.forEach((row, rowIdx) => {
      row.forEach((col, colIdx) => {
        if (col === 0) {
          positions.push([rowIdx, colIdx]);
        }
      });
    });

    return positions;
  }

  findTrails() {
    const trailheads = this.getTrailheads();
    for (const _idx in trailheads) {
      const idx = int(_idx);
      const trailheadLoc = trailheads[idx];
      const trailsBefore = this.validTrails;
      this.validTrailEndLocations.set(trailheadLoc.toString(), []);
      this.findValidPaths([0], trailheadLoc, trailheadLoc);
      console.log(
        `Trailhead ${trailheadLoc} has ${this.validTrails - trailsBefore} trails`,
      );
    }
  }

  findValidPaths(
    numsSoFar: number[],
    startingLocation: [number, number],
    location: [number, number],
  ) {
    this.goTo(...location);
    const lastNum = numsSoFar.at(-1)!;
    const peeks = Object.entries(this.peekAround(location));
    peeks.forEach(([direction, { location: peekLoc, value }]) => {
      // console.log(`We're at ${numsSoFar} and the current value is ${value}`);
      if (value === undefined) return;
      if (
        value === 9 &&
        numsSoFar.length === 9 &&
        !this.validTrailEndLocations
          .get(startingLocation.toString())!
          .includes(peekLoc.toString())
      ) {
        this.validTrails++;
        this.validTrailEndLocations.set(startingLocation.toString(), [
          ...this.validTrailEndLocations.get(startingLocation.toString())!,
          peekLoc.toString(),
        ]);
        return;
      }
      if (value === lastNum + 1) {
        this.findValidPaths([...numsSoFar, value], startingLocation, peekLoc);
      }
    });
  }

  peekAround(location: [number, number]) {
    const originalPos = this.position;
    this.goTo(...location);
    const [row, col] = location;
    const peeks: Record<
      'up' | 'right' | 'down' | 'left',
      { location: [number, number]; value: number | undefined }
    > = {
      up: { location: [row - 1, col], value: this.peek('up') },
      right: { location: [row, col + 1], value: this.peek('right') },
      down: { location: [row + 1, col], value: this.peek('down') },
      left: { location: [row, col - 1], value: this.peek('left') },
    };
    this.goTo(...originalPos);
    return peeks;
  }
}

const hiking = new HikingTraversable(iAmCurrentlyHittingTheGriddyForUkraine);
hiking.findTrails();
console.log(hiking.validTrails);

/*
8 9 0 1 0 1 2 3
  ^ v
7 8 1>2 1 8 7 4
  ^   v
8 7 4<3 0 9 6 5
  ^ v
9 6<5 4 9 8 7 4

4 5 6 7 8 9 0 3

3 2 0 1 9 0 1 2

0 1 3 2 9 8 0 1

1 0 4 5 6 7 3 2
*/
