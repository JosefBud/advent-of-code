import { int } from '../../util';
// import { input } from './test-input';
import { input } from './input';

/*
Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
*/

// Ranked
enum HandTypes {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

const games: [string, number][] = input.map((inp) => {
  const [hand, bidString] = inp.split(' ');
  return [hand, int(bidString)];
});

const hands: Record<HandTypes, [string, number][]> = {
  [HandTypes.HighCard]: [],
  [HandTypes.OnePair]: [],
  [HandTypes.TwoPair]: [],
  [HandTypes.ThreeOfAKind]: [],
  [HandTypes.FullHouse]: [],
  [HandTypes.FourOfAKind]: [],
  [HandTypes.FiveOfAKind]: [],
};

games.forEach(([hand, bid]) => {
  const cards = new Map<string, number>();
  hand.split('').forEach((card) => {
    const current = cards.get(card) ?? 0;
    cards.set(card, current + 1);
  });

  // Switch-case? What? What's that?
  let handType: HandTypes = HandTypes.HighCard;
  // AAAAA - Five of a kind
  if (cards.size === 1) handType = HandTypes.FiveOfAKind;
  // Four of a kind or full house
  if (cards.size === 2) {
    [...cards.values()].forEach((numOfCard) => {
      // AA8AA - Four of a kind
      if (numOfCard === 1) handType = HandTypes.FourOfAKind;
      // 23332 - Full house
      if (numOfCard === 2) handType = HandTypes.FullHouse;
    });
  }
  // Three of a kind or two pair
  if (cards.size === 3) {
    [...cards.values()].forEach((numOfCard) => {
      // TTT98 - Three of a kind
      if (numOfCard === 3) handType = HandTypes.ThreeOfAKind;
      // 23432 - Two pair
      if (numOfCard === 2) handType = HandTypes.TwoPair;
    });
  }
  // A23A4 - One pair
  if (cards.size === 4) handType = HandTypes.OnePair;
  // 23456 - High card
  if (cards.size === 5) handType = HandTypes.HighCard;

  hands[handType].push([hand, bid]);
});

const RANKS = {
  '2': 0,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 4,
  '7': 5,
  '8': 6,
  '9': 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

Object.entries(hands).forEach(([handType, handsOfThisType]) => {
  handsOfThisType.sort(([cardA], [cardB]) => {
    const cardAChars = cardA.split('');
    const cardBChars = cardB.split('');
    for (let i = 0; i < 5; i++) {
      const charA = cardAChars[i];
      const charB = cardBChars[i];
      if (charA === charB) continue;
      return RANKS[charA] - RANKS[charB];
    }
    return 0;
  });
  hands[handType] = handsOfThisType;
});

console.log(hands);
const total = Object.values(hands)
  .flat()
  .map(([, bid], idx) => bid * (idx + 1))
  .reduce((a, b) => a + b);

console.log(total);
