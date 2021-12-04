const fs = require('fs');

fs.readFile('./bingoBoards.txt', 'utf-8', (err, data) => {
  const rows = data.split('\n');
  const boards = [];
  let currentBoard = [];
  for (const row of rows) {
    if (row) {
      const numbers = row.split(' ').filter((num) => num);
      currentBoard.push(numbers.map((num) => parseInt(num)));
    } else {
      boards.push(currentBoard);
      currentBoard = [];
    }
  }

  fs.writeFile('./bingoBoards.json', JSON.stringify(boards), (err) => {
    if (err) console.error(err);
    console.log('fin');
  });
});
