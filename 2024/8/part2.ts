import { getExampleInput, getInput, stringify } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const map = input
  .trim()
  .split('\n')
  .map((i) => i.split(''));

class NodeMap {
  /**
   * @example { a: [[1,1],[5,1]], J: [[8,4],[9,2],[4,4]] }
   */
  antennas: Map<string, [number, number][]> = new Map();
  map: string[][];
  constructor(map: string[][]) {
    this.map = map;
    this.map.forEach((row, ri) => {
      row.forEach((char, ci) => {
        if (char.match(/([A-Za-z0-9])/)) {
          const existingCoords = this.antennas.get(char);
          this.antennas.set(char, [...(existingCoords ?? []), [ri, ci]]);
        }
      });
    });
  }

  findAntinodes() {
    const ants = [...this.antennas.entries()];
    const antinodePositions = new Set<string>();
    ants.forEach(([freq, positions]) => {
      positions.forEach((pos, idx) => {
        const [row, col] = pos;
        // console.log(`${freq} at ${row},${col}`);
        for (let innerIdx = idx + 1; innerIdx < positions.length; innerIdx++) {
          const [row2, col2] = positions[innerIdx];
          let diffRow = row2 - row;
          let diffCol = col2 - col;

          const startingAntinodesSize = antinodePositions.size;
          let latestAnti = [row2, col2];
          while (true) {
            const [latestRow, latestCol] = latestAnti;
            const [antiRow, antiCol] = [
              latestRow + diffRow,
              latestCol + diffCol,
            ];
            latestAnti = [antiRow, antiCol];
            if (
              antiRow >= 0 &&
              antiRow <= this.map.length - 1 &&
              antiCol >= 0 &&
              antiCol <= this.map[antiRow].length - 1
            ) {
              antinodePositions.add([antiRow, antiCol].toString());
            } else {
              break;
            }
          }

          latestAnti = [row, col];
          while (true) {
            const [latestRow, latestCol] = latestAnti;
            const [antiRow, antiCol] = [
              latestRow - diffRow,
              latestCol - diffCol,
            ];
            latestAnti = [antiRow, antiCol];
            if (
              antiRow >= 0 &&
              antiRow <= this.map.length - 1 &&
              antiCol >= 0 &&
              antiCol <= this.map[antiRow].length - 1
            ) {
              antinodePositions.add([antiRow, antiCol].toString());
            } else {
              break;
            }
          }
          antinodePositions.add([row, col].toString());
          antinodePositions.add([row2, col2].toString());
        }
      });
    });

    return antinodePositions;
  }

  printMapWithAntinodes() {
    const positions = this.findAntinodes();
    console.log('size:', positions.size);
    positions.forEach((val) => {
      const [row, col] = val.split(',');
      if (!this.map[row][col].match(/([A-Za-z0-9])/)) {
        this.map[row][col] = '#';
      } else {
        console.log('Not going to overwrite', this.map[row][col]);
      }
    });

    this.map.forEach((row) => {
      console.log(...row);
    });

    console.log("compared to AoC's:");

    const testMap = `##....#....#
.#.#....0...
..#.#0....#.
..##...0....
....0....#..
.#...#A....#
...#..#.....
#....#.#....
..#.....A...
....#....A..
.#........#.
...#......##`;
    testMap
      .trim()
      .split('\n')
      .forEach((row) => {
        console.log(...row);
      });
  }
}

const nodeMap = new NodeMap(map);
const antinodes = nodeMap.findAntinodes();
console.log(antinodes.size);
