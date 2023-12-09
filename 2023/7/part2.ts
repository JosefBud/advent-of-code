import { int } from '../../util';
import { findFirstNonJoker, findNonJokerWithNum } from './helpers';
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
export enum HandTypes {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

const hands: Record<HandTypes, [string, number][]> = {
  [HandTypes.HighCard]: [],
  [HandTypes.OnePair]: [],
  [HandTypes.TwoPair]: [],
  [HandTypes.ThreeOfAKind]: [],
  [HandTypes.FullHouse]: [],
  [HandTypes.FourOfAKind]: [],
  [HandTypes.FiveOfAKind]: [],
};

export const RANKS = {
  J: 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8,
  T: 9,
  Q: 10,
  K: 11,
  A: 12,
};

export type CardType = keyof typeof RANKS;

const games: [string, number][] = input.map((inp) => {
  const [hand, bidString] = inp.split(' ');
  return [hand, int(bidString)];
});

games.forEach(([hand, bid]) => {
  const cards = new Map<CardType, number>();
  hand.split('').forEach((cardStr) => {
    const card = cardStr as CardType;
    const current = cards.get(card) ?? 0;
    cards.set(card, current + 1);
  });

  // Manipulate "cards" map based on Joker cards, but push unmanipulated "hand" variable at the end
  if (cards.has('J')) {
    const num = cards.get('J') as number;
    // JJJJ2
    if (num === 4) {
      const otherCard = findFirstNonJoker(cards);
      cards.set(otherCard, 5);
      cards.delete('J');
    }
    // JJJ22 or JJJ23
    if (num === 3) {
      if (cards.size === 2) {
        const otherCard = findFirstNonJoker(cards);
        cards.set(otherCard, 5);
        cards.delete('J');
      }
      if (cards.size === 3) {
        const otherCard = findFirstNonJoker(cards);
        // cards.size === 2 ? JJJ22>22222 : JJJ23>22223
        cards.set(otherCard!, 4);
        cards.delete('J');
      }
    }
    // JJ222, JJ223, JJ234
    if (num === 2) {
      // JJ222
      if (cards.size === 2) {
        const otherCard = findFirstNonJoker(cards);
        cards.set(otherCard, 5);
        cards.delete('J');
      }
      // JJ223 or JJ233
      if (cards.size === 3) {
        // Find the card type w/ 2 cards
        const otherCard = findNonJokerWithNum(cards, 2);
        cards.set(otherCard!, 5);
        cards.delete('J');
      }
      // JJ234
      if (cards.size === 4) {
        const otherCard = findFirstNonJoker(cards);
        cards.set(otherCard, 3);
        cards.delete('J');
      }
    }
    // J2222, J2223, J2234, J2345
    if (num === 1) {
      // J2222
      if (cards.size === 2) {
        const otherCard = findFirstNonJoker(cards);
        cards.set(otherCard, 5);
        cards.delete('J');
      }
      // J2223, J2233, J2333
      if (cards.size === 3) {
        const otherCard =
          findNonJokerWithNum(cards, 3) ?? findNonJokerWithNum(cards, 2)!;
        cards.set(otherCard, cards.get(otherCard)! + 1);
        cards.delete('J');
      }
      // J2234 or J2334
      if (cards.size === 4) {
        const otherCard = findNonJokerWithNum(cards, 2);
        cards.set(otherCard!, 3);
        cards.delete('J');
      }
      // J2345
      if (cards.size === 5) {
        const otherCard = findFirstNonJoker(cards);
        cards.set(otherCard, 2);
        cards.delete('J');
      }
    }
  }

  if (hand === 'JJJT7') console.log(cards);
  // Switch-case? What? What's that?
  let handType: HandTypes = HandTypes.HighCard;
  // console.log([...cards.keys()], cards.size, typeof cards.size);
  // AAAAA - Five of a kind
  if (cards.size === 1) {
    handType = HandTypes.FiveOfAKind;
  }
  // Four of a kind or full house
  if (cards.size === 2) {
    [...cards.entries()].forEach(([cardType, numOfCard]) => {
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
  if (cards.size === 5) {
    // console.log('High card:', hand);
    handType = HandTypes.HighCard;
  }

  hands[handType].push([hand, bid]);
});

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
