import { pool } from '../database/db';
import { useIdentifier } from './functions';



on('playerConnecting', async (name: string, kickReason: string, deferrals: any) => {
  const player = (global as any).source

  let licenseIdentifer = null;

  await setTimeout(async () => {
    for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
      const identifiers = GetPlayerIdentifier(player, i);
  
      if (identifiers.includes('license')) {
        licenseIdentifer = identifiers;
        console.log(licenseIdentifer);
      }
    }

    const identifier = await useIdentifier(licenseIdentifer)

    if (identifier === null) {
      console.log("User does not exist");

      const query = 'INSERT INTO players (identifier, player_name) VALUES (?, ?)';
      await pool.query(query, [licenseIdentifer, name]);
      
      console.log(`Created user with license: ${licenseIdentifer} and name: ${name}`)
    } else {
      console.log(`User: ${name} | Identifier: ${identifier}, has joined`)
    }


  }, 0)
})
