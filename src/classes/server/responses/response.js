/**
 * @export
 * @class Response
 * @typedef {Response}
 * @template {Object} T
 */
export class Response {
  /**
   * Creates an instance of Response.
   * @constructor
   * @param {import("express").Response} res
   * @param {number} statusCode
   * @param {T} data
   * @param {string} status
   */
  constructor(res, statusCode, data, status) {
    res.status(statusCode).send({
      status,
      ...data,
    });
  }
}
