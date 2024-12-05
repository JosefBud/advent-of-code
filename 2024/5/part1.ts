import { getExampleInput, getInput, int } from '../../util/index.ts';

// const input = getExampleInput();
const input = getInput();

const lines = input.split('\n');
const emptyLineIdx = lines.indexOf('');
const rules = lines
  .slice(0, emptyLineIdx - 1)
  .map((r) => r.split('|').map(int));
const updates = lines.slice(emptyLineIdx + 1).map((u) => u.split(',').map(int));

const validUpdateIndeces: number[] = [];
for (const _idx in updates) {
  const idx = int(_idx);
  const pages = updates[idx];

  let isInvalid = false;
  for (const _pgidx in pages) {
    const pgidx = int(_pgidx);
    if (pgidx === pages.length - 1) break;

    const page = pages[pgidx];
    const otherPages = pages.slice(pgidx + 1);
    const isBreakingRule = rules.some(
      (rule) => rule[1] === page && otherPages.includes(rule[0]),
    );
    if (isBreakingRule) {
      isInvalid = true;
      break;
    }
  }
  if (!isInvalid) {
    validUpdateIndeces.push(idx);
  }
}

const validUpdates = updates.filter((_, idx) =>
  validUpdateIndeces.includes(idx),
);

const sumOfMiddlePages = validUpdates
  .map((u) => u[(1 + u.length) / 2 - 1])
  .reduce((a, b) => a + b);

console.log(sumOfMiddlePages);
