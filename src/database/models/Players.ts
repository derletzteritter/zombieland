import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class Players {
 
    @PrimaryColumn({
      length: 100
    })
    identifier: string;

    @Column()
    player_name: string;

    @Column()
    account: number;

    @Column()
    level: number;
}
