import { spawn } from 'child_process';
import { pool } from '../../database/db';
import { Position } from '../../typings/player';

export class Player {
    playerSource: any;

    constructor(pSource?: any) {
      this.playerSource = pSource;
    }

    /**
     * Creates a new player
     * @param identifer The player identifier - license
     * @param playerName The player name
     */
    async create(identifer: string, playerName: string) {
      const query = 'INSERT INTO players (identifier, player_name) VALUES (?, ?)';
      await pool.query(query, [identifer, playerName]);

      console.log(`Created user with license: ${identifer} and name: ${playerName}`)
    }

    // gets the license identifier, no need to really do a db query? or maybe🤷‍♂️
    getIdentifier() {
      const identifer = GetPlayerIdentifier(this.playerSource, 1)
      return identifer;
    }

    async savePosition(x, y, z) {
      const query = "UPDATE players SET position = '{?, ?, ?}'";
      await pool.query(query, [x, y, z])
    }

    async getPosition() {
      const identifier = this.getIdentifier()
      const query = 'SELECT position FROM players WHERE identifier = ?';
      const [results] = await pool.query(query, [identifier])

      const positions = results;
      const spawnPos = JSON.parse(positions[0].position)

      return spawnPos;
    }

    /**
     * Server side
     * @param kickReason The reason for the kick
     */
    kick(kickReason: string) {
      console.log(`${this.playerSource} was kicked for the reason: ${kickReason}`)
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

    getMoney() {
      
    }
}



export const ZBPlayer = {
  fromId: (source) => {
    return new Player(source);
  }
};


