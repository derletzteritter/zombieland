import { pool } from '../database/db';
import { Identifier } from '../typings/player';

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

export async function useIdentifier(identifier: string): Promise<string> {
  const query = "SELECT identifier FROM players WHERE identifier = ?"
  const [results] = await pool.query(query, [identifier]);
  const _identifier = <Identifier[]>results;
  if (_identifier.length === 0) return null;
  return _identifier[0].identifier;
}