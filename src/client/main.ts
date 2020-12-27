import { ESX } from './client';

// listening to an even from server, or vise versa
onNet('someEvent', (message: string) => {
  ESX.ShowNotification(message, false, false, 2);
})