import { randomUUID } from 'crypto';
import * as fs from 'fs';
export class FileManager {
  /**
   * @memberof FileManager
   */
  path;
  /**
   *  Creates an instance of FileManager.
   * @param {String} path
   * @memberof FileManager
   */
  constructor(path) {
    this.path = path;
  }
  async crear(entidad) {
    const id = randomUUID();
    const entidadesYaCargadas = await this.getAll();
    const nuevasEntidades = [...entidadesYaCargadas, { id, ...entidad }];
    const datosStr = JSON.stringify(nuevasEntidades, null, 2);
    await fs.promises.writeFile(this.path, datosStr);
    return id;
  }

  async getAll() {
    try {
      const entidades = await fs.promises.readFile(this.path);
      return JSON.parse(entidades);
    } catch (error) {
      console.error({ error });
      return [];
    }
  }

  async get(id) {
    const todasLasEntidades = await this.getAll();
    const entidadCargada = todasLasEntidades.find(
      (entidad) => entidad.id === id,
    );
    return entidadCargada;
  }

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

  async eliminar(id) {
    const todasLasEntidades = await this.getAll();
    const entidadesSinLaEntidad = todasLasEntidades.filter((e) => e.id !== id);
    const datosStr = JSON.stringify(entidadesSinLaEntidad, null, 2);
    await fs.promises.writeFile(this.path, datosStr);
  }
}
