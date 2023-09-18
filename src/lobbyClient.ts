import { LobbyClient } from 'boardgame.io/client';
import { server } from './constants';

export const lobbyClient = new LobbyClient({ server });