import path from 'path';
import { FileManager } from '../data/db.js';
import fileDirName from '../utils/fileDirName.js';
import { Manager } from './manager.js';

const { __dirname } = fileDirName(import.meta);

class UserManager extends Manager {}

export const userManager = new UserManager(
  new FileManager(path.join(__dirname, '..', 'data', 'usuarios.json'))
);
