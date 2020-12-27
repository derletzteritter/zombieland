import { Server } from 'esx.js';

// importing all files that will get bundled
import './main';

export let ESX: Server;

emit('esx:getSharedObject', (obj: Server) => (ESX = obj));
