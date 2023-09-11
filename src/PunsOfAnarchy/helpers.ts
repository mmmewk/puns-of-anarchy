import { PlayerID } from "boardgame.io";
import { shuffle } from "lodash";
import { CardSet, GameState, PlayerMap } from "./types";
import { MAX_HAND_SIZE } from "./constants";

export const generatePlayerIds = (numPlayers: number) => {
  const playerIds = [];
  for (let i = 0; i < numPlayers; i++) {
    playerIds.push(`${i}`);
  }
  return playerIds;
};

export const generatePlayerMap = <T>(numberOfPlayers: number, getPlayerValue: (id: PlayerID) => T) => {
  const playerIds = generatePlayerIds(numberOfPlayers);

  return playerIds.reduce((accum, id) => {
    accum[id] = getPlayerValue(id);
    return accum;
  }, {} as { [key: PlayerID]: T });
}

export const canDrawFrom = (cards: CardSet) => {
  return cards.deck.length + cards.discard.length > 0;
}

export const drawFrom = (cards: CardSet) => {
  if (!canDrawFrom(cards)) return undefined;

  if (cards.deck.length === 0) {
    cards.deck = shuffle(cards.discard);
    cards.discard = [];
  }

  return cards.deck.shift();
}

export const handIsFull = (hand: string[]) => {
  return hand.length >= MAX_HAND_SIZE;
};

export const handsFull = (hands: PlayerMap<string[]>) => {
  return Object.values(hands).every(handIsFull)
}

export const draw = (hand: string[], cards: CardSet) => {
  if (!handIsFull(hand) && canDrawFrom(cards)) hand.push(drawFrom(cards) as string);
};

export const discard = (hand: string[], cards: CardSet) => {
  while(hand.length > 0) cards.discard.push(hand.pop() as string);
}

export const dealHands = (numberOfPlayers: number, cards: CardSet) => {
  const hands = generatePlayerMap(numberOfPlayers, () => []);

  while(!handsFull(hands) && canDrawFrom(cards)) {
    Object.values(hands).forEach((hand) => draw(hand, cards));
  }

  return hands;
};

export const discardSubmissions = (game: GameState, playerID: PlayerID, remove: string) => {
  game.submissions[playerID].forEach((submission) => {
    if (submission.originalText === remove) return;

    game.phrases.discard.push(submission.originalText);
  });
  game.submissions[playerID] = [];
};