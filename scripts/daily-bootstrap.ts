#!/usr/bin/env node
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import spawn from 'node:child_process';
import { __dirname } from '../util';
import env from '../.env.json' with { type: 'json' };

// Idk, this just looks cleaner than a string with inconsistent indenting. Sue me.
const SOLUTION_TEMPLATE = [
  "import { getExampleInput, getInput } from '../../util/index.ts';",
  '',
  'const input = getExampleInput();',
  '// const input = getInput();',
  '',
].join('\n');

const sleep = async (ms: number = 1000) =>
  new Promise((r) => setTimeout(r, ms));

/**
 * Bootstraps the directory and files for the day's puzzle.
 *
 * Always checks for existence of files before attempting to write, so that this can be
 * run repeatedly if one part of it fails.
 */
async function main() {
  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const dirPath = __dirname() + `/../${year}/${day}`;
  const puzzleUrl = `https://adventofcode.com/${year}/day/${day}`;

  // Create directory for today
  if (!fsSync.existsSync(dirPath)) {
    await fs.mkdir(dirPath);
    console.log("Created today's directory");
  }

  // Create part1 + part2
  if (!fsSync.existsSync(`${dirPath}/part1.ts`)) {
    await fs.writeFile(`${dirPath}/part1.ts`, SOLUTION_TEMPLATE);
    console.log('Created part1.ts');
  }
  if (!fsSync.existsSync(`${dirPath}/part2.ts`)) {
    await fs.writeFile(`${dirPath}/part2.ts`, SOLUTION_TEMPLATE);
    console.log('Created part2.ts');
  }

  // Fetch the example input and write it to text-input.txt
  if (!fsSync.existsSync(`${dirPath}/example-input.txt`)) {
    console.log('Fetching example input for day', day);
    const res = await fetch(puzzleUrl);
    const html = await res.text();
    const matches = html.match(/example[\s\S]*?<code>([\s\S]*?)<\/code>/);
    if (matches?.[1]) {
      await fs.writeFile(`${dirPath}/example-input.txt`, matches[1]);
      console.log('Created text-input.txt');
    } else {
      console.error('There are no matches for day', day);
      await fs.writeFile(`${dirPath}/example-page.txt`, html);
    }
  }

  if (!fsSync.existsSync(`${dirPath}/input.txt`)) {
    console.log('Fetching input for day', day);
    const res = await fetch(`${puzzleUrl}/input`, {
      headers: { Accept: 'text/plain', cookie: env.cookie },
    });
    if (!res.ok) {
      console.error('Getting input failed, most likely due to a bad cookie');
      return;
    }
    const text = await res.text();
    await fs.writeFile(`${dirPath}/input.txt`, text);
    console.log('Created input.txt');
  }

  spawn.exec(`open ${puzzleUrl}`);
  spawn.exec(`code ${dirPath}/part1.ts`);
}

main();
