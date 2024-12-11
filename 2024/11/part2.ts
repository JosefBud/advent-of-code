import { getExampleInput, getInput, int } from '../../util/index.ts';
import fs from 'node:fs';

// const input = getExampleInput();
const input = getInput();

const stonesArr = input.trim().split(' ').map(int);

class PhysicsDefyingStones {
  stones: number[];
  uniqueStones = new Map<number, number>();

  constructor(stones: number[]) {
    this.stones = stones;
    this.stones.forEach((s) => {
      const curr = this.uniqueStones.get(s);
      if (curr === undefined) {
        this.uniqueStones.set(s, 1);
      } else {
        this.uniqueStones.set(s, curr + 1);
      }
    });
  }

  get uniqueStonesArr() {
    return [...this.uniqueStones.keys()].toSorted((a, b) => a - b);
  }
  get uniqueStonesSum() {
    const thing = [...this.uniqueStones.values()];
    return [...this.uniqueStones.values()].reduce((a, b) => a + b);
  }

  blink() {
    let newUniqueStones = new Map(this.uniqueStones);
    this.uniqueStones.forEach((numOfStones, stone) => {
      const currentStoneValue = newUniqueStones.get(stone) ?? 0;
      newUniqueStones.set(stone, currentStoneValue - numOfStones);
      if (currentStoneValue - numOfStones === 0) {
        newUniqueStones.delete(stone);
      }

      // Now we only have to add the new values
      if (stone === 0) {
        const newStone = stone + 1;
        const newStoneValue = newUniqueStones.get(newStone) ?? 0;
        newUniqueStones.set(newStone, newStoneValue + numOfStones);
      } else if (`${stone}`.length % 2 === 0) {
        const stoneStr = `${stone}`;
        const halfPointIdx = stoneStr.length / 2;
        const left = int(stoneStr.slice(0, halfPointIdx));
        const right = int(stoneStr.slice(halfPointIdx));

        const currentLeftValue = newUniqueStones.get(left) ?? 0;
        const currentRightValue = newUniqueStones.get(right) ?? 0;
        if (left === right) {
          newUniqueStones.set(
            left,
            currentLeftValue + numOfStones + numOfStones,
          );
        } else {
          newUniqueStones.set(left, currentLeftValue + numOfStones);
          newUniqueStones.set(right, currentRightValue + numOfStones);
        }
      } else {
        const newStone = stone * 2024;
        const newStoneValue = newUniqueStones.get(newStone) ?? 0;
        newUniqueStones.set(newStone, newStoneValue + numOfStones);
      }
    });
    this.uniqueStones = new Map(newUniqueStones);
  }

  blinkNTimes(n: number) {
    for (let i = 1; i <= n; i++) {
      console.log(`Blink ${i} executing`);
      this.blink();
    }
  }
}

const s = new PhysicsDefyingStones(stonesArr);
s.blinkNTimes(75);
console.log(s.uniqueStonesSum);
