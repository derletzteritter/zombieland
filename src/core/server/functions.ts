import { Player } from '../../classes/server/Player';
import { pool } from '../../database/db';
import { Identifier } from '../../typings/player';

export async function useIdentifier(identifier: string): Promise<string> {
  const query = "SELECT identifier FROM players WHERE identifier = ?"
  const [results] = await pool.query(query, [identifier]);
  const _identifier = <Identifier[]>results;
  if (_identifier.length === 0) return null;
  return _identifier[0].identifier;
}

RegisterCommand('giveweapon', async (source: number, args: string[], raw: string) => {
  let player = new Player(source);
  player.giveWeapon("WEAPON_PISTOL", -1)
  // gets the identifier

  await player.getPosition();
  await player.addMoney(3000)
  
  console.log(`Gave gun to ped. Player: ${GetPlayerName(source)} | Gun: WEAPON_SMG`)
}, false);