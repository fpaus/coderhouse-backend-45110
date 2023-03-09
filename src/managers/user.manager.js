import { FileManager } from '../data/db.js';
import { Manager } from './manager.js';

class UserManager extends Manager {}

export const userManager = new UserManager(
  new FileManager('../data/usuarios.json'),
);
