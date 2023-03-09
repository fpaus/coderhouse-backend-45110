export class ValidationError extends Error {
  constructor({ code, mensaje }) {
    super(mensaje);
    this.statusCode = code;
    this.mensaje = mensaje;
  }
}
