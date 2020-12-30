// spawning 

import { Delay } from "../../utils/fivem";

on('playerSpawned', () => {
  emitNet('ZB:PlayerSpawned')
  console.log('Player has spawned')
})

onNet('ZB:SpawnPlayer', async (pos) => {
  await Delay(1);
  
  const defaultModel = GetHashKey("mp_m_freemode_01");
  RequestModel(defaultModel)

  while (!HasModelLoaded(defaultModel)) {
    await Delay(1)
  }
  
  SetPlayerModel(PlayerId(), defaultModel);
  SetPedDefaultComponentVariation(PlayerPedId());
  SetModelAsNoLongerNeeded(defaultModel);

  SetEntityCoordsNoOffset(PlayerPedId(), pos.x, pos.y, pos.z, false, false, false);
})

RegisterCommand('getcoords', () => {
  console.log(GetEntityCoords(PlayerId()))
}, false)