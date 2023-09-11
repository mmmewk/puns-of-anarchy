import { Game } from "boardgame.io";
import { GameState, Pun } from "./types";
import { isUndefined, shuffle } from "lodash";
import { dealHands, discard, discardSubmissions, drawFrom, generatePlayerMap } from "./helpers";
import { MIN_SUBMISSION_SIZE, categories, phrases } from "./constants";
import { ActivePlayers, INVALID_MOVE } from "boardgame.io/core";

const PunsOfAnarchyGame : Game<GameState> = {
    name: 'PunsOfAnarchy',
    setup: ({ ctx }) => {
      return {
        categories: { deck: shuffle(categories), discard: [] },
        phrases: { deck: shuffle(phrases), discard: [] },
        playerCategories: generatePlayerMap(ctx.numPlayers, () => undefined),
        playerHands: generatePlayerMap(ctx.numPlayers, () => []),
        submissions: generatePlayerMap(ctx.numPlayers, () => []),
        winningPuns: generatePlayerMap(ctx.numPlayers, () => []),
      }
    },
    phases: {
      submitPuns: {
        start: true,
        turn: {
          activePlayers: ActivePlayers.ALL,
        },
        onBegin: ({ G, ctx }) => {
          G.playerCategories = generatePlayerMap(ctx.numPlayers, () => drawFrom(G.categories));
          G.playerHands = dealHands(ctx.numPlayers, G.phrases);
        },
        moves: {
          submitPun: ({ G, playerID }, pun : Pun) => {
            const hand = G.playerHands[playerID];
            const submitTo = Object.keys(G.playerCategories).find((id) => G.playerCategories[id] === pun.category);


            if (submitTo === playerID) {
              console.log('wrong player')
              return INVALID_MOVE;
            }

            const submissionPile = G.submissions[submitTo || ''];
            
            if (!hand || !submissionPile) {
              if (!hand) console.log('no hand')
              if (!submitTo) console.log('no target')
              if (!submissionPile) console.log('no pile')
              return INVALID_MOVE;
            }

            const cardIndex = hand.findIndex((phrase) => pun.originalText === phrase);

            if (cardIndex === -1) {
              console.log('card not found');
              return INVALID_MOVE;
            }

            // Remove old card and draw a new one
            const nextCard = drawFrom(G.phrases);
            if (nextCard) {
              hand.splice(cardIndex, 1, nextCard);
            } else {
              hand.splice(cardIndex, 1);
            }

            submissionPile.push(pun);
          },
        },
        endIf: ({ G }) => {
          return Object.values(G.submissions).every((pile) => pile.length >= MIN_SUBMISSION_SIZE);
        },
        next: 'judgePuns',
      },
      judgePuns: {
        turn: {
          minMoves: 1,
          maxMoves: 1,
        },
        moves: {
          pick: ({ G, playerID }, pun: Pun) => {
            G.winningPuns[pun.submittedBy].push(pun);
            G.playerCategories[playerID] = undefined;
            discardSubmissions(G, playerID, pun.originalText);
          },
        },
        endIf: ({ G }) => {
          // End once everyone has picked a winner
          return Object.values(G.playerCategories).every(isUndefined);
        },
        onEnd: ({ G }) => {
          // Discard all phrase cards at end of round so we can evenly distribute them on next round
          Object.values(G.playerHands).forEach((hand) => {
            discard(hand, G.phrases);
          });
        },
        next: 'submitPuns',
      },
    }
  };

  export default PunsOfAnarchyGame;