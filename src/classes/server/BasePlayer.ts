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
		const query = 'INSERT INTO players (identifier, player_name, account) VALUES (?, ?, ?)';
		await pool.query(query, [identifier, playerName, 3000]);

		console.log(`Created user with license: ${identifier} and name: ${playerName}`)
	}

	// gets the license identifier, no need to really do a db query? or maybe
	getIdentifier(): string {
		return GetPlayerIdentifier(this.playerSource, 1);
	}

	async getRole(): Promise<string> {
    const identifier = this.getIdentifier()
    
		const [result] = await pool.query('SELECT role FROM players WHERE identifier = ?', [identifier]);
		return result[0].role;
	}



}