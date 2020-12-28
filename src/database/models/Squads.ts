import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Squads {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  squad_name: string;

  @Column()
  level: number;

}