import fsSync from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export * from './data-structures/index.ts';

export const __filename = () => fileURLToPath(import.meta.url);
export const __dirname = () => dirname(__filename());
export const int = (input: string): number => parseInt(input, 10);
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const loopFallback = (ms = 5000) => new Date().getTime() + ms;
export const stringify = (input: object) => JSON.stringify(input, null, 2);

export type FoundNumber = {
  index: number;
  number: number;
  digitLength: number;
};
type TFindNumbersInString = (input: string) => FoundNumber[];
export const findNumbersInString: TFindNumbersInString = (input) => {
  const inputSplit = input.split('');
  const returns: FoundNumber[] = [];
  for (let i = 0; i < inputSplit.length - 1; i++) {
    const char = inputSplit[i];
    const number = {
      index: -1,
      number: 0,
      digitLength: 0,
    };
    let totalNumber = '';
    if (isNaN(parseInt(char))) {
      continue;
    }
    totalNumber += char;
    number.index = i;
    for (let a = i + 1; a < inputSplit.length; a++) {
      const nextChar = inputSplit[a];
      if (isNaN(parseInt(nextChar))) {
        i = a;
        break;
      }
      totalNumber += nextChar;
      if (a === inputSplit.length - 1) {
        i = inputSplit.length + 1;
        break;
      }
    }
    number.number = parseInt(totalNumber);
    number.digitLength = parseInt(totalNumber).toString().length;
    returns.push(number);
  }

  return returns;
};

export const deepEqual = (arrA: any[], arrB: any[]) => {
  // Arrays
  if (Array.isArray(arrA) && Array.isArray(arrB)) {
    if (arrA.length !== arrB.length) return false;
    for (const _idxA in arrA) {
      const idxA = int(_idxA);
      const eleA = arrA[idxA];
      const eleB = arrB[idxA];
      if (Array.isArray(eleA) && Array.isArray(eleB)) {
        if (!deepEqual(eleA, eleB)) {
          return false;
        }
      } else {
        if (eleA !== eleB) {
          return false;
        }
      }
    }
    return true;
  }
  throw new Error('deepEqual args must be arrays');
};

export const intersection = <T extends string | number>(
  arrA: Array<T>,
  arrB: Array<T>,
) => {
  const arrBCopy = [...arrB];
  return arrA.filter((val) => {
    if (arrBCopy.includes(val)) {
      arrBCopy.splice(arrBCopy.indexOf(val), 1);
      return true;
    }
  });
};

/**
 * Gets the file path for a function calling from any {year}/{day} directory
 */
export const getCallerFilePath = () => {
  const callStack = new Error().stack;
  if (callStack) {
    // Find the part of the call stack that has {year}/{day} in the path. This will break after 2099. Good luck with that.
    const [stack] = callStack
      .split('\n')
      .filter((stack) => stack.match(/\/20[2-9][0-9]\/[0-9]{1,2}\//));

    // Then capture the file path out of the full error stack string
    const [, path] = stack.match(/file:\/\/[\s\S]*?([\s\S]*?):[0-9]/) ?? [];
    if (path) {
      return dirname(path);
    }
  }

  throw new Error(
    'Unable to resolve call stack or input path while getting input',
  );
};

export const getInput = () => {
  const path = getCallerFilePath();
  return fsSync.readFileSync(path + '/input.txt', { encoding: 'ascii' });
};

export const getExampleInput = () => {
  const path = getCallerFilePath();
  return fsSync.readFileSync(path + '/example-input.txt', {
    encoding: 'ascii',
  });
};
