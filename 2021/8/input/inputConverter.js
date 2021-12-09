const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const rows = data.split('\n');

  const digitSets = [];
  for (const row of rows) {
    if (row) {
      let [patterns, output] = row.split(' | ');
      patterns = patterns.split(' ');
      output = output.split(' ');
      digitSets.push([patterns, output]);
    }
  }

  fs.writeFile('./input.json', JSON.stringify(digitSets), (err) => {
    if (err) console.error(err);
    console.log('fin');
  });
});
