import { PlayerID } from "boardgame.io";

export type CardSet = {
    deck: string[];
    discard: string[];
};

export type PlayerMap<T> = { [id: PlayerID]: T };

export type GameState = {
    categories: CardSet;
    phrases: CardSet;
    playerCategories: PlayerMap<string | undefined>;
    playerHands: PlayerMap<string[]>;
    submissions: PlayerMap<Pun[]>;
    winningPuns: PlayerMap<Pun[]>;
};

export type Pun = {
    category: string,
    originalText: string,
    punText: string,
    submittedBy: PlayerID,
}
