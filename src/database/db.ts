import "reflect-metadata";
import { createConnection } from "typeorm";
import { Player } from "./models/Player";

await createConnection({
  url: "mysql://root@localhost/zombieland?",
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'zombieland',
  synchronize: true,
  logging: false,
  entities: [
    Player
  ]
}).then(async connection => {

  // this will be removed

    console.log("Inserting a new user into the database...");
    const player = new Player();

    // creates a new player instance

    player.identifier = "34556677";
    player.player_name = "CrazyKiller123";
    player.account = 2000;
    player.level = 1;

    // saving the player
    await connection.manager.save(player);
    console.log("Saved a new user with id: " + player.identifier);

    console.log("Loading users from the database...");
    
    // finding all players and logging then
    const users = await connection.manager.find(Player);
    console.log("Loaded users: ", users);

}).catch(error => console.log(error));
