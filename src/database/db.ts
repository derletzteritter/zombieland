import "reflect-metadata";
import { createConnection } from "typeorm";
import { Players } from "./models/Players";
import { Squads } from "./models/Squads";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new Players();
    user.player_name = "Timber";
    user.level = 1;
    user.account = 1500;
    await connection.manager.save(user);

    
    console.log("Saved a new user with id: " + user.identifier);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(Players);
    console.log("Loaded users: ", users);


    const squad = new Squads();
    squad.squad_name = 'Gang shit';
    squad.level = 1;

    const newSquads = await connection.getRepository(Squads);
    newSquads.save(squad);

    const theSquad = newSquads.find();
    console.log('Loaded squads: ', theSquad)

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
