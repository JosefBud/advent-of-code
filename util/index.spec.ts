import { describe, it } from 'node:test';
import a from 'node:assert/strict';
import {
  type FoundNumber,
  deepEqual,
  findNumbersInString,
  intersection,
} from './index.ts';

describe('utils', () => {
  describe('findNumbersInString', () => {
    it('Works as expected with numbers neither at beginning nor end', () => {
      const TEST_STRING = 'are4893burp944dingle';
      const EXPECTED: FoundNumber[] = [
        { digitLength: 4, index: 3, number: 4893 },
        { digitLength: 3, index: 11, number: 944 },
      ];
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 2);
      foundNumbers.forEach((foundNumber, idx) => {
        a.deepEqual(foundNumber, EXPECTED[idx]);
      });
    });

    it('Works as expected with number at beginning', () => {
      const TEST_STRING = '994421spurgle8dingle';
      const EXPECTED: FoundNumber[] = [
        { digitLength: 6, index: 0, number: 994421 },
        { digitLength: 1, index: 13, number: 8 },
      ];
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 2);
      foundNumbers.forEach((foundNumber, idx) => {
        a.deepEqual(foundNumber, EXPECTED[idx]);
      });
    });

    it('Works as expected with number at the end', () => {
      const TEST_STRING = 'biffit4854stinker123jeebus46';
      const EXPECTED: FoundNumber[] = [
        { digitLength: 4, index: 6, number: 4854 },
        { digitLength: 3, index: 17, number: 123 },
        { digitLength: 2, index: 26, number: 46 },
      ];
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 3);
      foundNumbers.forEach((foundNumber, idx) => {
        a.deepEqual(foundNumber, EXPECTED[idx]);
      });
    });

    it('Works as expected with number at beginning and end', () => {
      const TEST_STRING = '123luna844';
      const EXPECTED: FoundNumber[] = [
        { digitLength: 3, index: 0, number: 123 },
        { digitLength: 3, index: 7, number: 844 },
      ];
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 2);
      foundNumbers.forEach((foundNumber, idx) => {
        a.deepEqual(foundNumber, EXPECTED[idx]);
      });
    });

    it('Works as expected with leading-zero numbers', () => {
      const TEST_STRING = '0012maker044welp';
      const EXPECTED: FoundNumber[] = [
        { digitLength: 2, index: 0, number: 12 },
        { digitLength: 2, index: 9, number: 44 },
      ];
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 2);
      foundNumbers.forEach((foundNumber, idx) => {
        a.deepEqual(foundNumber, EXPECTED[idx]);
      });
    });

    it('Works as expected with no numbers', () => {
      const TEST_STRING = 'luna.is.a.stinker';
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 0);
    });

    it('Works as expected with only number', () => {
      const TEST_STRING = '87654';
      const EXPECTED: FoundNumber[] = [
        { digitLength: 5, index: 0, number: 87654 },
      ];
      const foundNumbers = findNumbersInString(TEST_STRING);
      a.equal(foundNumbers.length, 1);
      foundNumbers.forEach((foundNumber, idx) => {
        a.deepEqual(foundNumber, EXPECTED[idx]);
      });
    });
  });

  describe('deepEqual', () => {
    it('Checks deep equality of shallow arrays', () => {
      a.equal(deepEqual([1, 2, 3], [1, 2, 3]), true);
      a.equal(deepEqual([1, 2, 3], [1, 2, 4]), false);
      a.equal(deepEqual(['a', 'b', 'c'], ['a', 'b', 'c']), true);
      a.equal(deepEqual(['a', 'b', 'c'], ['a', 'b', 'd']), false);
    });
    it('Checks deep equality of nested arrays', () => {
      // prettier-ignore
      {
        a.equal(
          deepEqual(
            [
              [[1, 2, 3],[4, 5, 6]],
              [[7, 8, 9],[10, 11, 12]],
              [[13, 14, 15],[16, 17, 18]],
              [[19, 20, 21],[22, 23, 24]],
            ],
            [
              [[1, 2, 3],[4, 5, 6]],
              [[7, 8, 9],[10, 11, 12]],
              [[13, 14, 15],[16, 17, 18]],
              [[19, 20, 21],[22, 23, 24]],
            ],
          ),
          true,
        );
        a.equal(
          deepEqual(
            [
              [[1, 2, 3],[4, 5, 6]],
              [[7, 8, 9],[10, 11, 12]],
              [[13, 14, 15],[16, 17, 18]],
              [[19, 20, 21],[22, 23, 999999]],
            ],
            [
              [[1, 2, 3],[4, 5, 6]],
              [[7, 8, 9],[10, 11, 12]],
              [[13, 14, 15],[16, 17, 18]],
              [[19, 20, 21],[22, 23, 24]],
            ],
          ),
          false,
        );
      }
    });
  });

  describe('intersection', () => {
    it('Returns the intersection of two arrays of numbers', () => {
      const NUM_ARRAY_1 = [10, 20, 30, 40];
      const NUM_ARRAY_2 = [10, 30, 50, 70];
      const NUM_ARRAY_3 = [20, 40, 60, 80];
      let result = intersection(NUM_ARRAY_1, NUM_ARRAY_2);
      a.deepEqual(result, [10, 30]);
      result = intersection(NUM_ARRAY_1, NUM_ARRAY_3);
      a.deepEqual(result, [20, 40]);
      result = intersection(NUM_ARRAY_2, NUM_ARRAY_3);
      a.deepEqual(result, []);
    });

    it('Returns the intersection of two arrays of strings', () => {
      const STR_ARRAY_1 = ['a', 'b', 'c', 'd'];
      const STR_ARRAY_2 = ['c', 'a', 'e', 'f'];
      const STR_ARRAY_3 = ['d', 'd', 'd', 'd'];
      let result = intersection(STR_ARRAY_1, STR_ARRAY_2);
      a.deepEqual(result, ['a', 'c']);
      result = intersection(STR_ARRAY_1, STR_ARRAY_3);
      a.deepEqual(result, ['d']);
      result = intersection(STR_ARRAY_3, STR_ARRAY_1);
      a.deepEqual(result, ['d']);
      result = intersection(STR_ARRAY_2, STR_ARRAY_3);
      a.deepEqual(result, []);
    });

    it('Returns the intersection of two mixed arrays', () => {
      const MIX_ARRAY_1 = [9, 8, 'gg', 'pp', 99];
      const MIX_ARRAY_2 = ['pp', 'abc', 'dd', 99, 55, 44];
      const MIX_ARRAY_3 = [22, 33, 9, 'gg', 60];
      let result = intersection(MIX_ARRAY_1, MIX_ARRAY_2);
      a.deepEqual(result, ['pp', 99]);
      result = intersection(MIX_ARRAY_1, MIX_ARRAY_3);
      a.deepEqual(result, [9, 'gg']);
      result = intersection(MIX_ARRAY_2, MIX_ARRAY_3);
      a.deepEqual(result, []);
    });
  });
});
