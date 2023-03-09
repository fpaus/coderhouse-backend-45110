import { ValidationError } from './validation-exception.js';
export class NotFoundException extends ValidationError {
  constructor(mensaje) {
    super({
      code: 404,
      mensaje,
    });
  }
}
