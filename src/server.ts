import { Server, Origins } from 'boardgame.io/server';
import PunsOfAnarchy from './PunsOfAnarchy/Game';
import { PostgresStore } from "bgio-postgres";

const db = new PostgresStore(process.env.DATABASE_URL || '');

const server = Server({
  games: [PunsOfAnarchy],
  origins: [Origins.LOCALHOST],
  db
});


const port = Number(process.env.PORT) || 8000;

server.run(port);
