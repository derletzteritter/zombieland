import { lchmod } from 'fs';
import { Squad } from '../../classes/Squad';


function createPlayer() {
  console.log('Player created')
}


interface PlayerConnecting {
  name: string;
  kickReason: string;
  deferrals: any;
}

on('playerConnecting', ({ name, kickReason, deferrals }: PlayerConnecting) => {
  deferrals.defer();

  const player = (global as any).source;

  setTimeout(() => {
    deferrals.update('CHECKING YOUR FUCKING LICENSE');

    let licenseIdentifier = null;

    for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
      const identifier = GetPlayerIdentifier(player, i);

      if (identifier.includes('license')) {
        licenseIdentifier = identifier;
        console.log(licenseIdentifier);
      }
    }

    // check if identifier is not in the players table
    if (!licenseIdentifier) {
      createPlayer()
    }

  }, 0)

})


let Sqaud = new Squad("kool kids");