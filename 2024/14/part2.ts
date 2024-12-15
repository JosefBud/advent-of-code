import { getExampleInput, getInput, int, sleep } from '../../util/index.ts';

// const [input, width, height] = [getExampleInput(), 11, 7];
const [input, width, height] = [getInput(), 101, 103];
const NUM_OF_DIAGONAL_CHECKS = 2;

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
  .map(() => Array.from(emptyRow));
console.log();

class RobotSecurityMap {
  initialGrid: number[][];
  grid: number[][];
  robots: [number, number, number, number][];
  loopsSoFar = 0;

  constructor(input: number[][], robots: [number, number, number, number][]) {
    this.grid = [...input.map((r) => [...r])];
    this.initialGrid = [...input.map((r) => [...r])];
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
    for (let i = 590; i <= n; i++) {
      this.loopsSoFar = i;
      if (i % 10_000 === 0) {
        console.log('Iteration', i);
      }
      this.grid = [...this.initialGrid.map((r) => [...r])];

      for (const _idx in this.robots) {
        const idx = int(_idx);
        const robot = this.robots[idx];
        const [posX, posY, movX, movY] = robot;

        const finalPosX = posX + ((movX * i) % this.width);
        const finalPosY = posY + ((movY * i) % this.height);

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
        // console.log('current value', this.grid[idxY][idxX]);
        this.grid[idxY][idxX] += 1;
      }

      for (const _rowIdx in this.grid) {
        const rowIdx = int(_rowIdx);
        if (rowIdx + 3 > this.grid.length - 1) {
          break;
        }
        const r1 = this.grid[rowIdx];
        const r2 = this.grid[rowIdx + 1];
        const r3 = this.grid[rowIdx + 2];
        const r4 = this.grid[rowIdx + 3];

        for (const _colIdx in r1) {
          const colIdx = int(_colIdx);
          if (colIdx + 3 > r1.length - 1) {
            break;
          }
          const cidx1 = colIdx;
          const cidx2 = colIdx + 1;
          const cidx3 = colIdx + 2;
          const cidx4 = colIdx + 3;

          if (
            r1[cidx1] > 0 &&
            r1[cidx2] > 0 &&
            r1[cidx3] > 0 &&
            r1[cidx4] > 0 &&
            r2[cidx1] > 0 &&
            r2[cidx2] > 0 &&
            r2[cidx3] > 0 &&
            r2[cidx4] > 0 &&
            r3[cidx1] > 0 &&
            r3[cidx2] > 0 &&
            r3[cidx3] > 0 &&
            r3[cidx4] > 0 &&
            r4[cidx1] > 0 &&
            r4[cidx2] > 0 &&
            r4[cidx3] > 0 &&
            r4[cidx4] > 0
          ) {
            this.displayGrid();
            return;
          }
        }
      }
    }
  }

  displayGrid() {
    const gridString = this.grid
      .map((row) => {
        return row.join('').replaceAll('0', ' ');
      })
      .join('\n');
    console.log(`\n\n\n\n------- ${this.loopsSoFar} -------\n\n\n\n`);
    console.log(gridString);
  }
}

const map = new RobotSecurityMap(emptyMap, parsed);
map.placeRobotsAfterNLoops(100_000);
