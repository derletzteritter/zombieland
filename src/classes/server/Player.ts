import {pool} from '../../database/db';
import {PlayerClass} from '../../typings/player';
import { BasePlayer } from "./BasePlayer";

export class Player extends BasePlayer {
     playerSource: any;
     readonly playerName: string;

    constructor(pSource?: any) {
      super(pSource)
      this.playerName = GetPlayerName(pSource);
    }

    // gets the license identifier, no need to really do a db query? or maybe
    getIdentifier(): string {
      return GetPlayerIdentifier(this.playerSource, 1);
    }

	/**
	 * Server side
	 * @param kickReason The reason for the kick
    */
    kick(kickReason: string) {
      console.log(`${this.playerSource} was kicked for the reason: ${kickReason}`)
    }

    getName(): string {
      return GetPlayerName(this.playerSource)
    }

    async savePosition(x, y, z) {
      const query = "UPDATE players SET position = '{?, ?, ?}'";
      await pool.query(query, [x, y, z])
    }

    async getPosition() {
      const identifier = this.getIdentifier()

      const query = 'SELECT position FROM players WHERE identifier = ?';
      const [results] = await pool.query(query, [identifier])

      console.log('Player name: ', this.getName());

      return JSON.parse(results[0].postion);
    }

    // INVENTORY
    /**
     * Gives weapon to the ped or source
     * @param weaponName Weapon name
     * @param ammoCount Ammo count for current weapon
     */
    giveWeapon(weaponName: string, ammoCount: number) {
      GiveWeaponToPed(GetPlayerPed(this.playerSource), GetHashKey(weaponName), ammoCount, false, true);
    }
    

    // ACCOUNT
    async addMoney(amount: number) {
      const identifier = this.getIdentifier()
      const query = 'UPDATE players SET account = ? WHERE identifier = ?';
      await pool.query(query, [amount, identifier])
    }

    getMoney(): number {
      return 
    }
}



export const ZBPlayer = {
  fromId: (source) => new Player(source)
}



