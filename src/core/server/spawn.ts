import { ZBPlayer } from "../../classes/server/Player";
import { Delay } from "../../utils/fivem";

onNet('ZB:PlayerSpawned', async () => {
  const _source = (global as any).source;
  console.log("PLAYER THAT IS SPAWNING: ", GetPlayerName(_source))

  let player = ZBPlayer.fromId(_source)

  const pos = await player.getPosition()
  console.log("SPAWN POSITION: ", pos)
  emitNet('ZB:SpawnPlayer', _source, pos)
})