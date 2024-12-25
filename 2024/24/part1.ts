import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

type Gate = 'XOR' | 'OR' | 'AND';
type Bit = 1 | 0;
const xor = (a?: Bit, b?: Bit): Bit => ((a || b) && !(a && b) ? 1 : 0);
const or = (a?: Bit, b?: Bit): Bit => (a || b ? 1 : 0);
const and = (a?: Bit, b?: Bit) => (a && b ? 1 : 0);

const [_startingVals, _gateConnections] = input.trim().split('\n\n');
const startingVals: [string, Bit][] = _startingVals.split('\n').map((str) => {
  const [name, val] = str.split(': ');
  return [name, int(val) as Bit];
});

const wires: Record<string, () => Bit> = Object.fromEntries(
  startingVals.map(([name, val]) => [name, () => val]),
);
const gateConnections: [string, Gate, string, string][] = _gateConnections
  .split('\n')
  .map((str) => {
    const reggie = /([a-z0-9]{3}) (XOR|OR|AND) ([a-z0-9]{3}) -> ([a-z0-9]{3})/g;
    const [[, a, gate, b, dest]] = str.matchAll(reggie).toArray();
    return [a, gate as Gate, b, dest];
  });

for (const conn of gateConnections) {
  const [a, gate, b, dest] = conn;
  let func: typeof xor | typeof or | typeof and;
  switch (gate) {
    case 'XOR':
      func = xor;
      break;
    case 'OR':
      func = or;
      break;
    case 'AND':
      func = and;
      break;
  }
  wires[dest] = () => func(wires[a](), wires[b]());
}

const results: Record<string, Bit> = {};
for (const wire in wires) {
  results[wire] = wires[wire]();
}

const bits = Object.keys(results)
  .sort((a, b) => (b < a ? -1 : 1))
  .filter((r) => r.startsWith('z'))
  .map((r) => {
    return results[r].toString();
  });

console.log(parseInt(bits.join(''), 2));
