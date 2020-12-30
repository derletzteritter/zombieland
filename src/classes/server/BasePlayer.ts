import {pool} from '../../database/db';

export class BasePlayer {
	readonly playerSource: any;

	constructor(pSource: number) {
		this.playerSource = pSource;
	}
	/**
	 * Creates a new player
	 * @param identifier The player identifier - license
	 * @param playerName The player name
	 */
	async create(identifier: string, playerName: string) {
		const query = 'INSERT INTO players (identifier, player_name) VALUES (?, ?)';
		await pool.query(query, [identifier, playerName]);

		console.log(`Created user with license: ${identifier} and name: ${playerName}`)
	}

}