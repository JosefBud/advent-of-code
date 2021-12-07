// Credit for this idea goes to Jonathan Paulson, who I saw use a script like this in his AoC videos
// https://www.youtube.com/channel/UCuWLIm0l4sDpEe28t41WITA/videos

const https = require('https');
const path = require('path');
const fs = require('fs/promises');
const { existsSync: fsExists } = require('fs');

const env = require('../.env.json');

// Color a string for console logging
const colorString = (string, colorCode = 32) => {
  const colorBegin = '\u001b[' + colorCode + 'm';
  const colorEnd = '\u001b[0m';
  return `${colorBegin}${string}${colorEnd}`;
};

// Setting year and day
let year, day;
// Getting year and day from script arguments
const yearArgIndex = process.argv.indexOf('--year');
const dayArgIndex = process.argv.indexOf('--day');
if (yearArgIndex !== -1) year = process.argv[yearArgIndex + 1];
if (dayArgIndex !== -1) day = process.argv[dayArgIndex + 1];

// Defaulting to today's date if the arguments given don't parse
if (!year || !day || isNaN(Number(year)) || isNaN(Number(day))) {
  const date = new Date();
  year = date.getFullYear();
  day = date.getDate();
}

https.get(
  `https://adventofcode.com/${year}/day/${day}/input`,
  { headers: { Accept: 'text/plain', cookie: env.cookie } },
  (res) => {
    const chunks = [];
    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', async () => {
      const final = Buffer.concat(chunks).toString();
      try {
        const yearPath = path.join(__dirname, '..', year.toString());
        const dayPath = path.join(yearPath, day.toString());
        const inputPath = path.join(dayPath, 'input');

        if (!fsExists(yearPath)) await fs.mkdir(yearPath);
        if (!fsExists(dayPath)) await fs.mkdir(dayPath);
        if (!fsExists(inputPath)) await fs.mkdir(inputPath);

        const filePath = path.join(inputPath, 'input.txt');

        await fs.writeFile(filePath, final);

        console.log(colorString(`Today's input written to ${filePath}`));
      } catch (error) {
        console.log(error);
      }
    });
  }
);
