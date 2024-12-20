import { getExampleInput, getInput, int } from '../../util/index.ts';

/*
I'm a little torn on this. Normally I try to never use libraries for AoC. But, while
looking to see why my regex matching was breaking, I found out that it was
"catastrophically backtracking" (https://www.regular-expressions.info/catastrophic.html)
and the solutions given weren't working in JavaScript.

I then found out that Google's re2 library just *doesn't* do that shit. At this point,
I feel like I'm just being gimped by a bug in regex. I felt like it would work if it
weren't for this bug. So, I grabbed this library. And I was right. So it's staying.

I'll happily write my own utilities or data structures for AoC, but I'm not going to build
my own linear regex.
*/
import { RE2JS } from 're2js';

// const input = getExampleInput();
const input = getInput();

const [_patterns, , ...designs] = input.trim().split('\n');
const patterns = _patterns.split(', ');
patterns.sort((a, b) =>
  b.length > a.length ? 1 : b.length < a.length ? -1 : b < a ? 1 : -1,
);

class TowelArranger {
  // I have a feeling the patterns are going to go from unlimited to limited in part 2 👀
  patterns: Array<{ pattern: string; qty: number }>;
  designs: string[];

  constructor(patterns: string[], designs: string[]) {
    this.patterns = patterns.map((pattern) => ({
      pattern,
      qty: 10 ** 10, // Basically unlimited in this context
    }));
    this.designs = [...designs];
  }

  findWorkingPatterns() {
    let total = 0;
    for (const _index in this.designs) {
      const index = int(_index);
      const design = this.designs[index];

      // Regex infinitely backtracking
      // const matches = design
      //   .matchAll(
      //     new RegExp(
      //       `(${patterns.map((p) => p.split('').join('+')).join('|')})*`,
      //       'g',
      //     ),
      //   )
      //   .toArray()
      //   .map(([m]) => m);

      const p = RE2JS.compile(`^(${patterns.join('|')})+$`);
      if (
        // matches.join('') === design
        p.matches(design)
      ) {
        total++;
      }
    }
    return total;
  }
}

const ta = new TowelArranger(patterns, designs);
const total = ta.findWorkingPatterns();
console.log(total);
