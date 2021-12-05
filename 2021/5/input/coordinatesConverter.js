const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
  const rows = data.split('\n');

  const coordinatesLine = rows.map((line) => {
    const [x1y1, x2y2] = line.split(' -> ');
    let [x1, y1] = x1y1.split(',');
    let [x2, y2] = x2y2.split(',');
    return [
      [Number(x1), Number(y1)],
      [Number(x2), Number(y2)]
    ];
  });

  fs.writeFile('./coordinates.json', JSON.stringify(coordinatesLine), (err) => {
    if (err) console.error(err);
    console.log('fin');
  });
});
