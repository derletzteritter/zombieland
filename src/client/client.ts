import { Client } from 'esx.js';

// importing all files that will get bundled
import './main';

export let ESX: Client;

emit('esx:getSharedObject', (obj: Client) => (ESX = obj));