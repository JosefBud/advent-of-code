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
        for (let innerIdx = idx + 1; innerIdx < positions.length; innerIdx++) {
          const [row2, col2] = positions[innerIdx];
          const diffRow = row2 - row;
          const diffCol = col2 - col;
          const antinode1 = [row2 + diffRow, col2 + diffCol];
          const antinode2 = [row - diffRow, col - diffCol];
          if (
            this.map[antinode1[0]] !== undefined &&
            this.map[antinode1[0]][antinode1[1]] !== undefined
          ) {
            antinodePositions.add(antinode1.toString());
          }
          if (
            this.map[antinode2[0]] !== undefined &&
            this.map[antinode2[0]][antinode2[1]] !== undefined
          ) {
            antinodePositions.add(antinode2.toString());
          }
        }
      });
    });

    return antinodePositions;
  }
}

const nodeMap = new NodeMap(map);
const antinodes = nodeMap.findAntinodes();
console.log(antinodes.size);
