import { getExampleInput, getInput, int } from '../../util/index.ts';

// const [input, width, height] = [getExampleInput(), 11, 7];
const [input, width, height] = [getInput(), 101, 103];

/**
 * [pX, pY, vX, vY]
 */
const parsed = input
  .trim()
  .split('\n')
  .map((line) => {
    const [coords] = line
      .matchAll(/p=(-?[0-9]{1,}),(-?[0-9]{1,}) v=(-?[0-9]{1,}),(-?[0-9]{1,})/g)
      .map<[number, number, number, number]>(([, pX, pY, vX, vY]) => [
        int(pX),
        int(pY),
        int(vX),
        int(vY),
      ])
      .toArray();
    return coords;
  });

const emptyRow: number[] = Array(width).fill(0);
const emptyMap: number[][] = Array(height)
  .fill(undefined)
  .map(() => [...emptyRow]);
console.log();

class RobotSecurityMap {
  grid: number[][];
  robots: [number, number, number, number][];

  constructor(input: number[][], robots: [number, number, number, number][]) {
    this.grid = [...input];
    this.robots = [...robots];
  }
  get height() {
    return this.grid.length;
  }
  get width() {
    return this.grid[0].length;
  }
  get middleRowIdx() {
    return Math.floor(this.height / 2);
  }
  get middleColIdx() {
    return Math.floor(this.width / 2);
  }

  getQuadrant(q: 1 | 2 | 3 | 4) {
    const half = this.grid.filter((row, rowIdx) => {
      return q === 1 || q === 2
        ? rowIdx < this.middleRowIdx
        : rowIdx > this.middleRowIdx;
    });
    return half.map((row, rowIdx) => {
      return row.filter((col, colIdx) => {
        return q === 1 || q === 3
          ? colIdx < this.middleColIdx
          : colIdx > this.middleColIdx;
      });
    });
  }

  calculateSafetyFactor() {
    return ([1, 2, 3, 4] as const)
      .map((quadrantNumber) => {
        return this.getQuadrant(quadrantNumber);
      })
      .map((quadrant) => {
        return quadrant
          .map((row) => row.reduce((a, b) => a + b))
          .reduce((a, b) => a + b);
      })
      .reduce((a, b) => a * b);
  }

  placeRobotsAfterNLoops(n: number) {
    for (const _idx in this.robots) {
      const idx = int(_idx);
      const robot = this.robots[idx];
      const [posX, posY, movX, movY] = robot;

      const finalPosX = posX + ((movX * n) % this.width);
      const finalPosY = posY + ((movY * n) % this.height);

      const idxX =
        finalPosX < 0
          ? this.width - Math.abs(finalPosX) // Position < 0
          : finalPosX >= this.width
            ? Math.abs(finalPosX) - this.width // Position > width
            : finalPosX; // Default
      const idxY =
        finalPosY < 0
          ? this.height - Math.abs(finalPosY) // Position < 0
          : finalPosY >= this.height
            ? Math.abs(finalPosY) - this.height // Position > height
            : finalPosY; // Default

      this.grid[idxY][idxX] += 1;
    }
  }
}

const map = new RobotSecurityMap(emptyMap, parsed);
map.placeRobotsAfterNLoops(100);
console.log(map.calculateSafetyFactor());
