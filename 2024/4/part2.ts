import { getExampleInput, getInput } from '../../util/index.ts';
import { SearchableTraversable } from '../../util/SearchableTraversable.ts';

// const input = getExampleInput();
const input = getInput();

const mappableInput = input.split('\n').map((c) => c.split(''));
const searchable = new SearchableTraversable(mappableInput);
console.log(searchable.searchX('MAS'));
