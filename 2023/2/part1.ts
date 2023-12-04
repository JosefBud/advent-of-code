import { input } from './input';
// import { input } from './test-input';

const games = input.split('\n');

const COLORS = ['red', 'green', 'blue'] as const;
const POSSIBLE = {
  red: 12,
  green: 13,
  blue: 14,
}

let total = 0;
games.forEach((game) => {
  let possible = true;
  const [gameNumString, gameSets] = game.split(':');
  const gameNumber = parseInt(gameNumString.split(' ')[1]);
  // sets === '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  const sets = gameSets.split(';')

  sets.forEach((set) => {
    // set === '3 blue, 4 red'
    // colorCombos === ['3 blue', '4 red']
    const colorCombos = set.split(',').map((s) => s.trim());
    // colorCombo === '3 blue'
    colorCombos.forEach((colorCombo) => {
      // numberStr === '3' | color === 'blue'
      const [numberStr, color] = colorCombo.split(' ') as [string, 'red' | 'green' | 'blue'];
      const number = parseInt(numberStr);
      if (number > POSSIBLE[color]) {
        possible = false;
      }
    })
  })

  if (possible) total += gameNumber;
});

console.log(total);