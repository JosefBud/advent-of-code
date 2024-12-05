import { getExampleInput, getInput } from '../../util/index.ts';
import { SearchableTraversable } from '../../util/traversable.ts';

// const input = getExampleInput();
const input = getInput();

const mappableInput = input.split('\n').map((c) => c.split(''));
const searchable = new SearchableTraversable(mappableInput);
console.log(searchable.search('XMAS'));
