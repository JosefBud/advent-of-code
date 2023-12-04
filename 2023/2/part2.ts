import { input } from './input';
// import { input } from './test-input';

const games = input.split('\n');

let total = 0;

games.forEach((game) => {
  const [, gameSets] = game.split(':');
  // sets === '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
  const sets = gameSets.split(';');

  const minimums = {
    red: 0,
    green: 0,
    blue: 0,
  };
  sets.forEach((set) => {
    // set === '3 blue, 4 red'
    // colorCombos === ['3 blue', '4 red']
    const colorCombos = set.split(',').map((s) => s.trim());
    // colorCombo === '3 blue'
    colorCombos.forEach((colorCombo) => {
      // numberStr === '3' | color === 'blue'
      const [numberStr, color] = colorCombo.split(' ') as [
        string,
        'red' | 'green' | 'blue',
      ];
      const number = parseInt(numberStr);
      if (number > minimums[color]) {
        minimums[color] = number;
      }
    });
  });

  const power = Object.values(minimums).reduce((a, b) => a * b);
  console.log(game, minimums, power);
  total += Object.values(minimums).reduce((a, b) => a * b);
});

console.log(total);
