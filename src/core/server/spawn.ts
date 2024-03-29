import { ZBPlayer } from "../../classes/server/Player";

onNet('ZB:PlayerSpawned', async () => {
  const _source = (global as any).source;
  console.log("PLAYER THAT IS SPAWNING: ", GetPlayerName(_source))

  let player = ZBPlayer.fromId(_source)

  const pos = await player.getPosition()
  console.log("SPAWN POSITION: ", pos)
  emitNet('ZB:SpawnPlayer', _source, pos)
})


on('playerDropped', async () => {
  const _source = (global as any).source;
  console.log(`Player ${GetPlayerName(_source)} disconnected`);
  
  const [x, y, z] = GetEntityCoords(GetPlayerPed(_source));
  
  // update position
  const Player = ZBPlayer.fromId(_source);
  await Player.savePosition(x, y, z);

})