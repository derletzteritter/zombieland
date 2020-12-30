import { ZBPlayer } from '../../classes/server/Player';
import { pool } from '../../database/db';
import { Identifier } from '../../typings/player';

// don't care about this. We can't really get the identifier based of their identifier LOL 
// this is only for checking if it exist when the player is joining
export async function useIdentifier(identifier: string): Promise<string> {
  const query = "SELECT identifier FROM players WHERE identifier = ?"
  const [results] = await pool.query(query, [identifier]);
  const _identifier = <Identifier[]>results;

  if (_identifier.length === 0) return null;
  return _identifier[0].identifier;
}

RegisterCommand('giveweapon', async (source: number, args: string[], raw: string) => {
  let Player = ZBPlayer.fromId(source);
  Player.giveWeapon("WEAPON_PISTOL", -1)
  // gets the identifier
  
  console.log(`Gave gun to ped. Player: ${Player.getName()} | Gun: WEAPON_SMG`)
}, false);