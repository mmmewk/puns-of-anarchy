import { Client as ReactClient } from "boardgame.io/react"
import { Client } from 'boardgame.io/client';
import PunsOfAnarchyGame from "./Game";
import PunsOfAnarchyBoard from "./Board";
import { SocketIO } from 'boardgame.io/multiplayer'
import { server } from "../constants";

export const serverClient = Client({
    game: PunsOfAnarchyGame,
    multiplayer: SocketIO({ server }),
});

const PunsOfAnarchyClient = ReactClient({
    game: PunsOfAnarchyGame,
    board: PunsOfAnarchyBoard,
    multiplayer: SocketIO({ server }),
});

export default PunsOfAnarchyClient;