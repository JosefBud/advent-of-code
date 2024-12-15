import { getExampleInput, getInput, int } from '../../util/index.ts';
const { ceil } = Math;

// const input = getExampleInput();
const input = getInput();

const buttonA = input
  .matchAll(/Button [AB]: X\+([0-9]{2,}), Y\+([0-9]{2,})/g)
  .filter(([line]) => line.startsWith('Button A'))
  .map<[number, number]>(([, x, y]) => [int(x), int(y)])
  .toArray();
const buttonB = input
  .matchAll(/Button [AB]: X\+([0-9]{2,}), Y\+([0-9]{2,})/g)
  .filter(([line]) => line.startsWith('Button B'))
  .map<[number, number]>(([, x, y]) => [int(x), int(y)])
  .toArray();
const prize = input
  .matchAll(/Prize: X=([0-9]{1,}), Y=([0-9]{1,})/g)
  .map<[number, number]>(([, x, y]) => [int(x), int(y)])
  .toArray();

/**  btn A  btn B  prize
 * [ [x,y], [x,y], [x,y] ]
 */
const machines: [[number, number], [number, number], [number, number]][] =
  buttonA.map((b, idx) => [b, buttonB[idx], prize[idx]]);

// const [machine] = machines;

let totalCost = 0;
machines.forEach((machine, idx) => {
  // if (idx !== 2) return;

  const [[aX, aY], [bX, bY], [prizeX, prizeY]] = machine;
  console.log(`Machine w/ prizes X=${prizeX}, Y=${prizeY}`);

  /**
   * [Button A presses, Button B presses, cost]
   */
  const winningCombos = new Set<[number, number, number]>();

  const numOfAX = ceil(prizeX / aX);
  const numOfAY = ceil(prizeY / aY);
  const aGoal = Math.max(numOfAX, numOfAY);
  console.warn('FIRST LOOP');
  for (let i = 1; i <= aGoal; i += 1) {
    const adjustedPrizeX = prizeX - aX * i;
    const adjustedPrizeY = prizeY - aY * i;
    // console.log(
    //   `Button A ${i} times, Button B ${(adjustedPrizeX / bX).toFixed(2)} times`,
    // );
    if (adjustedPrizeX % bX === 0 && adjustedPrizeY % bY === 0) {
      console.warn('Could win!');
      const bPresses = adjustedPrizeX / bX;
      const cost = i * 3 + bPresses;
      if (
        adjustedPrizeX >= 0 &&
        adjustedPrizeY >= 0 &&
        i <= 100 &&
        bPresses <= 100 &&
        bPresses * bX + i * aX === prizeX &&
        bPresses * bY + i * aY === prizeY
      ) {
        winningCombos.add([i, bPresses, cost]);
        console.log(
          `Winning combo: Btn A ${i} times, Btn B ${bPresses} times. Cost: ${cost}`,
        );
      }
    }
  }

  const numOfBX = ceil(prizeX / bX);
  const numOfBY = ceil(prizeY / bY);
  const bGoal = Math.max(numOfBX, numOfBY);
  console.warn('SECOND LOOP');
  for (let i = 1; i <= bGoal; i += 1) {
    const adjustedPrizeX = prizeX - bX * i;
    const adjustedPrizeY = prizeY - bY * i;
    // console.log(
    //   `Button A ${(adjustedPrizeX / aX).toFixed(2)} times, Button B ${i} times`,
    // );
    if (adjustedPrizeX % aX === 0 && adjustedPrizeY % aY === 0) {
      const aPresses = adjustedPrizeX / aX;
      const cost = aPresses * 3 + i;
      if (
        adjustedPrizeX >= 0 &&
        adjustedPrizeY >= 0 &&
        i <= 100 &&
        aPresses <= 100 &&
        aPresses * aX + i * bX === prizeX &&
        aPresses * aY + i * bY === prizeY
      ) {
        winningCombos.add([aPresses, i, cost]);
        console.log(
          `Winning combo: Btn A ${aPresses} times, Btn B ${i} times. Cost: ${aPresses * 3 + i}`,
        );
      }
    }
  }

  if (winningCombos.size > 0) {
    const [[, , finalCost]] = [...winningCombos].sort((a, b) => a[2] - b[2]);
    console.log(`Lowest cost is ${finalCost}`);
    console.log('---------');
    totalCost += finalCost;
  }
});

console.log(totalCost);

// 77216 is too high
// 76882 is too high
// 36787 is too high
// 35997 is correct

/*

Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

loopGoal = (prizeX / aX) < (prizeY / aY) ? prizeX / aX : prizeY / aY
loop: i = 1; i <= ???; i++
  (prizeX - (aX * i)) % bX === 0
  (prizeY - (aY * i)) % bY === 0

loopGoal = (prizeX / bX) < (prizeY / bY) ? prizeX / bX : prizeY / bY
loop: i = 1; i<= ???; i++
  (prizeX - (bX * i)) % aX === 0
  (prizeY - (bY * i)) % aY === 0

try (A)X1, (B)Xn > (A)X2, (B)Xn > (A)X3, (B)Xn

*/
