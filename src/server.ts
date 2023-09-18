import { Server, Origins } from 'boardgame.io/server';
import PunsOfAnarchy from './PunsOfAnarchy/Game';
import { PostgresStore } from "bgio-postgres";
import 'dotenv/config'

const db = new PostgresStore(process.env.DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
});

const origin = process.env.NODE_ENV === 'development' ?
  Origins.LOCALHOST :
  'https://puns-of-anarchy.mekoppe.com';

const server = Server({
  games: [PunsOfAnarchy],
  origins: [origin],
  db
});

const port = Number(process.env.PORT) || 8000;

server.run(port);
