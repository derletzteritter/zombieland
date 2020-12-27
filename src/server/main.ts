import { ESX } from './server';

RegisterCommand('givesomecash', () => {
  const player = (global as any).source
  const xPlayer = ESX.GetPlayerFromId(player)
  
  xPlayer.addMoney(300)

  // trigger event to client, or vise versa
  emitNet('someEvent', player, "This is my message, yoo")
}, false)