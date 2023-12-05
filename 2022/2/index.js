const input = require('./input');

/**
 * A == Rock
 * B == Paper
 * C == Scissors
 *
 * X == Rock (1)
 * Y == Paper (2)
 * Z == Scissors (3)
 *
 * Loss == 0
 * Draw == 3
 * Win == 6
 */

const opponent = [];
const player = [];

let total = 0;

input.split('\n').forEach((pair) => {
  const [oppPlay, playerPlay] = pair.split(' ');
  const draw =
    (oppPlay === 'A' && playerPlay === 'X') ||
    (oppPlay === 'B' && playerPlay === 'Y') ||
    (oppPlay === 'C' && playerPlay === 'Z');

  const oppWins =
    (oppPlay === 'A' && playerPlay === 'Z') ||
    (oppPlay === 'B' && playerPlay === 'X') ||
    (oppPlay === 'C' && playerPlay === 'Y');

  const playerWins =
    (oppPlay === 'A' && playerPlay === 'Y') ||
    (oppPlay === 'B' && playerPlay === 'Z') ||
    (oppPlay === 'C' && playerPlay === 'X');

  if (draw) total += 3
  if (oppWins) total += 0
  if (playerWins) total += 6

  if (playerPlay === 'X') total += 1
  if (playerPlay === 'Y') total += 2
  if (playerPlay === 'Z') total += 3
});

console.log(total)
total = 0

/**
 * A == Rock (1)
 * B == Paper (2)
 * C == Scissors (3)
 *
 * X == Lose
 * Y == Draw
 * Z == Win
 *
 * Loss == 0
 * Draw == 3
 * Win == 6
 */

input.split('\n').forEach((pair) => {
  const [oppPlay, outcome] = pair.split(' ');

  // Loss
  if (outcome === 'X') {
    if (oppPlay === 'A') total += 3
    if (oppPlay === 'B') total += 1
    if (oppPlay === 'C') total += 2
  }

  // Draw
  if (outcome === 'Y') {
    if (oppPlay === 'A') total += 1 + 3
    if (oppPlay === 'B') total += 2 + 3
    if (oppPlay === 'C') total += 3 + 3
  }

  // Win
  if (outcome === 'Z') {
    if (oppPlay === 'A') total += 2 + 6
    if (oppPlay === 'B') total += 3 + 6
    if (oppPlay === 'C') total += 1 + 6
  }
});

console.log(total);