import { useIdentifier } from './functions';
import { ZBPlayer } from '../../classes/server/Player';


on('playerConnecting', async (name: string, kickReason: string, deferrals: any) => {

  // gets the source and and the "id"
  // fromId just return a new instance of the Player class
  const playerSource = (global as any).source
  let player = ZBPlayer.fromId(playerSource)

  let licenseIdentifer = null;

  await setTimeout(async () => {
    for (let i = 0; i < GetNumPlayerIdentifiers(playerSource); i++) {
      const identifiers = GetPlayerIdentifier(playerSource, i);
      console.log(identifiers);
  
      if (identifiers.includes('license')) {
        licenseIdentifer = identifiers;
      }
    }

    const identifier = await useIdentifier(licenseIdentifer)

    // checking if the player exists, if not create one
    if (identifier === null) {
      console.log("User does not exist");

      await player.create(licenseIdentifer, name)
    } else {
      console.log(`User: ${name} | Identifier: ${identifier}, has joined`)
    }


  }, 0)
})
