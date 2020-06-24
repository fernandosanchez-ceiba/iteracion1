export class ErrorDeNegocio extends Error {
  constructor(mensaje: string) {
    super(mensaje);
  }
}
