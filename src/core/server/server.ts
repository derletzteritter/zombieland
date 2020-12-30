import { useIdentifier } from './functions';
import { BasePlayer } from '../../classes/server/BasePlayer';


on('playerConnecting', async (name: string, kickReason: string, deferrals: any) => {

  // gets the source and and the "id"
  // fromId just returns a new instance of the Player class
  const playerSource = (global as any).source
  let Player = new BasePlayer(playerSource)

  let licenseIdentifier = null;

  await setTimeout(async () => {
    for (let i = 0; i < GetNumPlayerIdentifiers(playerSource); i++) {
      const identifiers = GetPlayerIdentifier(playerSource, i);
      console.log(identifiers);
  
      if (identifiers.includes('license')) {
        licenseIdentifier = identifiers;
      }
    }

    const identifier = await useIdentifier(licenseIdentifier)

    // checking if the player exists, if not create one
    if (identifier === null) {
      console.log("User does not exist");

      await Player.create(licenseIdentifier, name)
    } else {
      console.log(`User: ${name} | Identifier: ${identifier}, has joined`)
    }


  }, 0)
})
