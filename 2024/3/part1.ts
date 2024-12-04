import { getInput } from '../../util.ts';

type Match = {
  0: string; // mul(764,432)
  1: string; // 764
  2: string; // 432
  index: number;
  input: string;
};

const main = async () => {
  const input = await getInput();
  const findMuls = /mul\(([0-9]*),([0-9]*)\)/g;
  const matches = input.matchAll(findMuls);

  let total = 0;
  for (const match of matches) {
    const [num1, num2] = [Number(match[1]), Number(match[2])];
    total += num1 * num2;
  }

  console.log(total);
};

main();
