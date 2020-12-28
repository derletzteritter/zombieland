import { Player } from './Player';

export class Squad extends Player {
  squadName: string;
  
  constructor(squad: string) {
    super()
    this.squadName = squad;
  }

  setLevel(level: number) {
    console.log(`${this.squadName} level is now ${level}`)
  }

  
}