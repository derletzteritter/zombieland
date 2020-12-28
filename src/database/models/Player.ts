import { Entity, PrimaryColumn, Column } from "typeorm";

// entity = table | class name is table name
@Entity()
export class Player {

  // creates the identifier column as primary
    @PrimaryColumn()
    identifier: string;

    @Column()
    player_name: string;

    @Column()
    account: number;

    @Column()
    level: number;

}
