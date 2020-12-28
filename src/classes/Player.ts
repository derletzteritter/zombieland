export class Player {
  playerSource: number;
  playerId: number;

  constructor(source?: number, ped?: number) {
    this.playerSource = source;
    this.playerId = ped;
  }

  giveWeapon(weaponName: string) {
    GiveWeaponToPed(this.playerSource || this.playerId, GetHashKey(weaponName), 300, false, true);
  }

  giveItem(itemName: string, count: number) {
    console.log(`Gave item: ${itemName} and the count was ${count}`);
  } 

  addMoney(amount: number) {
    console.log(`Added ${amount} to ${GetPlayerName(this.playerSource)} account`);
  }
} 