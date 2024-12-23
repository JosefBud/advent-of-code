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

const possibleChiefNetworks = new Set<string>();
for (const [comp, net] of connections.entries()) {
  // comp == tc
  // net == kh, wh, td, co
  for (const netComp of net) {
    // netcomp == td
    // netcompnet = tc, wh, qp, yn
    const netCompNet = connections.get(netComp)!;
    // samecomps = [wh]
    const sameComps = intersection(net, netCompNet);
    if (!sameComps.length) continue;
    for (const thirdComp of sameComps) {
      if (
        comp.startsWith('t') ||
        netComp.startsWith('t') ||
        thirdComp.startsWith('t')
      ) {
        possibleChiefNetworks.add([comp, netComp, thirdComp].sort().join('-'));
      }
    }
  }
}

console.log(possibleChiefNetworks);

/*

kh: [tc, qp, ub, ta]
tc: [kh, wh, td, co]
qp: [kh, ub, td, wh]
wh: [tc, td, yn, qp]
td: [tc, wh, qp, yn]

tc-td-wh
qp-td-wh

tc: check kh, wh, td, co for overlap
td: wh overlap
check wh for tc and td

kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn


*/
