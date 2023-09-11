import { Client } from 'boardgame.io/react';
import TicTacToeBoard from "./Board";
import PunsOfAnarchyGame from "./Game";
import { SocketIO } from 'boardgame.io/multiplayer'

export default Client({
    game: PunsOfAnarchyGame,
    board: TicTacToeBoard,
    numPlayers: 2,
    multiplayer: SocketIO({ server: 'localhost:8000' }),
});