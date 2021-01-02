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
  Player.giveWeapon(args[0], -1)
  // gets the identifier

  await Player.getMoney()
  await Player.addMoney(5000);
  
  console.log(`Gave gun to ped. Player: ${Player.getName()} | Gun: ${args[0]}`)
}, false);


RegisterCommand('kickplayer', (source, args: string[], raw: string) => {
  ZBPlayer.kick(args[0], "Fuck you cheater")
}, false)

RegisterCommand('getrole', async (source, args, raw) => {
  const Player = ZBPlayer.fromId(source);
  const role = await Player.getRole()
  console.log("USER ROLE IS: ", role);
}, false)

RegisterCommand('setpos', async (source) => {
  const [x, y, z] = GetEntityCoords(GetPlayerPed(source));
  const Player = ZBPlayer.fromId(source);
  await Player.savePosition(x, y, z);
}, false);


