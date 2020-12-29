import { pool } from '../database/db';

interface Player {
  identifier: string;
  player_name: string;
  account: number;
  level: number;
}

const getPlayer = async (): Promise<Player[]> => {
  const query = "SELECT * FROM player";
  const [ results ] = await pool.query(query);
  return <Player[]>results;
}

RegisterCommand('getplayers', async (source: number, args: string[], raw: string) => {
  console.log("Getting players...");
  const players = await getPlayer();
  console.log(players);
}, false)