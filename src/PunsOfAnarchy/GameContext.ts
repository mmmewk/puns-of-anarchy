import { createContext, useContext } from "react";
import { Props } from "./Board";
import { FilteredMetadata } from 'boardgame.io';


interface GameContextType extends Props {
    hand: string[],
    players: FilteredMetadata,
}

export const GameContext = createContext<GameContextType>({
    ctx: {
      numPlayers: 0,
      playOrder: [],
      playOrderPos: 0,
      activePlayers: null,
      currentPlayer: '',
      turn: 0,
      phase: ''
    },
    G: {
      categories: {
        deck: [],
        discard: []
      },
      phrases: {
        deck: [],
        discard: []
      },
      playerCategories: {},
      playerHands: {},
      submissions: {},
      winningPuns: {}
    },
    moves: {},
    hand: [],
    players: [],
    plugins: {},
    _undo: [],
    _redo: [],
    _stateID: 0,
    isActive: false,
    isConnected: false,
    log: [],
    matchID: '',
    playerID: null,
    events: {
      endGame: undefined,
      endPhase: undefined,
      endTurn: undefined,
      setPhase: undefined,
      endStage: undefined,
      setStage: undefined,
      setActivePlayers: undefined
    },
    reset: function (): void {
      throw new Error('Function not implemented.');
    },
    undo: function (): void {
      throw new Error('Function not implemented.');
    },
    redo: function (): void {
      throw new Error('Function not implemented.');
    },
    sendChatMessage: function (message: any): void {
      throw new Error('Function not implemented.');
    },
    chatMessages: [],
    isMultiplayer: false
  });

  export const useGameContext = () => {
    return useContext(GameContext);
  }