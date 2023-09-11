import { Server, Origins } from 'boardgame.io/server';
import PunsOfAnarchy from './PunsOfAnarchy/Game';

const server = Server({
  games: [PunsOfAnarchy],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
