import { randomUUID } from 'crypto';
import * as fs from 'fs';
/**
 * It contains methods for creating, getting, modifying, and deleting entities, as well as a constructor that sets the path for the file where the entities will be stored.
 *
 * @class
 * @name FileManager
 * @kind class
 * @exports
 */
export class FileManager {
  /**
   * @property
   * @name path
   * @kind property
   * @memberof FileManager
   * @type {string}
   */
  path;
  /**
   *  Creates an instance of FileManager.
   * @memberof FileManager
   * @constructor
   * @name FileManager
   * @param {string} path
   */
  constructor(path) {
    this.path = path;
  }
  /**
   * @async
   * @method
   * @name crear
   * @kind method
   * @memberof FileManager
   * @param {any} entidad
   * @returns {Promise<string>}
   */
  async crear(entidad) {
    const id = randomUUID();
    const entidadesYaCargadas = await this.getAll();
    const nuevasEntidades = [...entidadesYaCargadas, { id, ...entidad }];
    const datosStr = JSON.stringify(nuevasEntidades, null, 2);
    await fs.promises.writeFile(this.path, datosStr);
    return id;
  }

  /**
   * @async
   * @method
   * @name getAll
   * @kind method
   * @memberof FileManager
   * @returns {Promise<any>}
   */
  async getAll() {
    try {
      const entidades = await fs.promises.readFile(this.path);
      return JSON.parse(entidades);
    } catch (error) {
      console.error({ error });
      return [];
    }
  }

  /**
   * @async
   * @method
   * @name get
   * @kind method
   * @memberof FileManager
   * @param {any} id
   * @returns {Promise<any>}
   */
  async get(id) {
    const todasLasEntidades = await this.getAll();
    const entidadCargada = todasLasEntidades.find(
      (entidad) => entidad.id === id,
    );
    return entidadCargada;
  }

  /**
   *
   * @async
   * @method
   * @name modificar
   * @kind method
   * @memberof FileManager
   * @param {any} id
   * @param {any} datos
   * @returns {Promise<void>}
   */
  async modificar(id, datos) {
    const entidadCargada = await this.get(id);
    if (!entidadCargada) {
      throw new Error('Entidad no encontrada');
    }
    const todasLasEntidades = await this.getAll();
    const entidadModificada = { ...entidadCargada, ...datos };
    const entidadesSinLaEntidad = todasLasEntidades.filter((e) => e.id !== id);
    const nuevasEntidades = [...entidadesSinLaEntidad, entidadModificada];
    const datosStr = JSON.stringify(nuevasEntidades, null, 2);
    await fs.promises.writeFile(this.path, datosStr);
  }

  /**
   *
   * @async
   * @method
   * @name eliminar
   * @kind method
   * @memberof FileManager
   * @param {any} id
   * @returns {Promise<void>}
   */
  async eliminar(id) {
    const todasLasEntidades = await this.getAll();
    const entidadesSinLaEntidad = todasLasEntidades.filter((e) => e.id !== id);
    const datosStr = JSON.stringify(entidadesSinLaEntidad, null, 2);
    await fs.promises.writeFile(this.path, datosStr);
  }
}
