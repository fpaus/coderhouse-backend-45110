import { FileManager } from '../data/db.js';
import { Manager } from './manager.js';

class PeliculasManager extends Manager {}

export const peliculasManager = new PeliculasManager(
  new FileManager('../data/peliculas.json'),
);
