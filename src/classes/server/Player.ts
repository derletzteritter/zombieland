import {pool} from '../../database/db';
import {BasePlayer} from "./BasePlayer";

export class Player extends BasePlayer {
	readonly playerName: string;

	constructor(pSource?: any) {
		super(pSource)
		this.playerName = GetPlayerName(pSource);
	}

	/**
	 * Get the player name
	 */
	getName(): string {
		return GetPlayerName(this.playerSource)
	}

	/**
	 * Save the players position
	 *
	 * Async Function
	 * @param x
	 * @param y
	 * @param z
	 */
	async savePosition(x, y, z) {
		const query = "UPDATE players SET position = '{?, ?, ?}'";
		await pool.query(query, [x, y, z])
	}

	/**
	 * Async function
	 */
	async getPosition(): Promise<object> {
		const identifier = this.getIdentifier()

		const query = 'SELECT position FROM players WHERE identifier = ?';
		const [results] = await pool.query(query, [identifier])

		console.log('Player name: ', this.getName());

		return JSON.parse(results[0].position);
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

	/**
	 * Get the player current balance
	 *
	 * Async function
	 */
	async getMoney(): Promise<number> {
	  const identifier = this.getIdentifier();

	  const query = 'SELECT account FROM players WHERE identifier = ?';
	  const [result] = await pool.query(query, [identifier]);

	  return result[0].account;
	}

	/**
	 * Adds new balance to the player
	 *
	 * Async function
	 * @param amount
	 */
	async addMoney(amount: number) {
		const currentMoney = await this.getMoney()
		const identifier = this.getIdentifier()

		const newBalance = currentMoney + amount
		const query = 'UPDATE players SET account = ? WHERE identifier = ?';
		await pool.query(query, [newBalance, identifier])
	}
}


export const ZBPlayer = {
	fromId: (source) => new Player(source),
	kick: (playerToKick, kickReason: string) => {
		DropPlayer(playerToKick, kickReason)
	}
}



