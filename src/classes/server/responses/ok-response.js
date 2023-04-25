import express from 'express';
import { Response } from './response.js';

/**
 * @export
 * @class OkResponse
 * @typedef {OkResponse}
 * @extends {Response<Res>}
 * @template Payload
 * @typedef {{payload: Payload}} Res
 */
export class OkResponse extends Response {
  /**
   * @constructor
   * @param {express.Response} res
   * @param {Payload} payload
   */
  constructor(res, payload) {
    super(res, 200, { payload }, 'success');
  }
}
