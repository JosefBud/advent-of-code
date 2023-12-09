export const int = (input: string): number => parseInt(input, 10);

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
