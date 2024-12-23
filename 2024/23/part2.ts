import { getExampleInput, getInput, intersection } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const networkedSets = input
  .trim()
  .split('\n')
  .map((s) => s.split('-'));

const connections = new Map<string, string[]>();
for (const [a, b] of networkedSets) {
  const currA = connections.get(a) ?? [];
  const currB = connections.get(b) ?? [];
  connections.set(a, [...currA, b]);
  connections.set(b, [...currB, a]);
}

let largestIntersection: string[] = [];
for (const [comp, net] of connections.entries()) {
  // comp == co
  // net == ka, ta, de, tc
  for (const netComp of net) {
    // netcomp == ka
    // netcompnet = co, tb, ta, de
    const netCompNet = connections.get(netComp)!;
    // samecomps = [ta, de]
    const sameComps = intersection(net, netCompNet);
    if (!sameComps.length) continue;
    let latestIntersection: string[] = [comp, netComp, ...sameComps];
    for (const interComp of sameComps) {
      // intercomp = ta
      // intercomp = de
      // intercompnet = [co, ka, de, kh]
      // intercompnet = [cg, co, ta, ka]
      const interCompNet = connections.get(interComp)!;
      latestIntersection = intersection(latestIntersection, [
        interComp,
        ...interCompNet,
      ]);
    }
    if (latestIntersection.length > largestIntersection.length) {
      largestIntersection = [...latestIntersection];
    }
  }
}

console.log(largestIntersection.sort().join(','));
