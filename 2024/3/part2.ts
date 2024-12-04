import { getInput } from '../../util/index.ts';

type Match = {
  0: string; // mul(764,432)
  1: string; // 764
  2: string; // 432
  index: number;
  input: string;
};

const main = async () => {
  const input = await getInput();
  const findMuls = /mul\(([0-9]*),([0-9]*)\)|do\(\)|don't\(\)/g;
  const matches = input.matchAll(findMuls);

  let enabled = true;
  let total = 0;
  for (const match of matches) {
    const [instruction, num1Str, num2Str] = match;
    if (instruction === 'do()') {
      enabled = true;
    } else if (instruction === "don't()") {
      enabled = false;
    } else if (enabled) {
      total += Number(num1Str) * Number(num2Str);
    }
  }

  console.log(total);
};

main();
