import { Server, Origins } from 'boardgame.io/server';
import PunsOfAnarchy from './PunsOfAnarchy/Game';

const server = Server({
  games: [PunsOfAnarchy],
  origins: [Origins.LOCALHOST],
});

const port = Number(process.env.PORT) || 8000;

server.run(port);
