import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SearchableTraversable } from './SearchableTraversable.ts';

describe('SearchableTraversable', () => {
  it('Should return the correct number of occurrences for searching the example input', () => {
    const searchable = new SearchableTraversable(EXAMPLE_INPUT);
    assert.strictEqual(searchable.search('XMAS'), 18);
  });

  it('Should return the correct number of occurrences for "X"-searching the example input', () => {
    const searchable = new SearchableTraversable(EXAMPLE_INPUT);
    assert.strictEqual(searchable.searchX('MAS'), 9);
  });
});

const EXAMPLE_INPUT: string[][] = [
  'MMMSXXMASM'.split(''),
  'MSAMXMSMSA'.split(''),
  'AMXSXMAAMM'.split(''),
  'MSAMASMSMX'.split(''),
  'XMASAMXAMM'.split(''),
  'XXAMMXXAMA'.split(''),
  'SMSMSASXSS'.split(''),
  'SAXAMASAAA'.split(''),
  'MAMMMXMMMM'.split(''),
  'MXMXAXMASX'.split(''),
];
