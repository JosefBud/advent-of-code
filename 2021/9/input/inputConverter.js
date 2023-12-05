const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  // Leave them as strings because some start with 0
  fs.writeFile('./input.json', JSON.stringify(data.split('\n')), (err) => {
    if (err) console.error(err);
    console.log('fin');
  });
});
