import { CardType } from './part2';

export const findFirstNonJoker = (cards: Map<CardType, number>): CardType =>
  [...cards.keys()].find((c) => c !== 'J')!;

export const findNonJokerWithNum = (
  cards: Map<CardType, number>,
  num: number,
): CardType | undefined => {
  return [...cards.entries()].find(([cardType, cardNum]) => {
    return cardType !== 'J' && cardNum === num;
  })?.[0];
};
