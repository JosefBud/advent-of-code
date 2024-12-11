import { getExampleInput, getInput, int } from '../../util/index.ts';

const input = getExampleInput();
// const input = getInput();

const stonesArr = input.trim().split(' ').map(int);

class PhysicsDefyingStones {
  stones: number[];

  constructor(stones: number[]) {
    this.stones = stones;
  }

  blink() {
    this.stones = this.stones.flatMap((stone) => {
      if (stone === 0) {
        return 1;
      } else if (`${stone}`.length % 2 === 0) {
        const stoneStr = `${stone}`;
        const halfPointIdx = stoneStr.length / 2;
        const left = int(stoneStr.slice(0, halfPointIdx));
        const right = int(stoneStr.slice(halfPointIdx));
        return [left, right];
      } else {
        return stone * 2024;
      }
    });

    return this.stones;
  }

  blinkNTimes(n: number) {
    for (let i = 1; i <= n; i++) {
      console.log(`Blink ${i} executing`);
      this.blink();
    }
    return this.stones;
  }
}

const s = new PhysicsDefyingStones(stonesArr);
console.log(s.blinkNTimes(25));
