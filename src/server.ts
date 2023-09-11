import { Server, Origins } from 'boardgame.io/server';
import PunsOfAnarchy from './PunsOfAnarchy/Game';
import { PostgresStore } from "bgio-postgres";
import 'dotenv/config'

const db = new PostgresStore(process.env.DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    },
  }
});

const server = Server({
  games: [PunsOfAnarchy],
  origins: [Origins.LOCALHOST, 'https://puns-of-anarchy.mekoppe.com'],
  db
});


const port = Number(process.env.PORT) || 8000;

server.run(port);
