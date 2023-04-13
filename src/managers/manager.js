export class Manager {
  #persistencia;
  constructor(persistencia) {
    this.#persistencia = persistencia;
  }
  async crear(entidad) {
    return this.#persistencia.crear(entidad);
  }

  async getAll() {
    return this.#persistencia.getAll();
  }

  async get(id) {
    return this.#persistencia.get(id);
  }

  async modificar(id, datos) {
    return this.#persistencia.modificar(id, datos);
  }

  async eliminar(id) {
    return this.#persistencia.eliminar(id);
  }
}
