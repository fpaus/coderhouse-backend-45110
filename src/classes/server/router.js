import express from 'express';
import jwt from 'jsonwebtoken';

/**
 * Express Router wrapper
 * @export
 * @class Router
 * @typedef {Router}
 */
export class Router {
  /**
   * @type {express.Router}
   * @private
   */
  #router;
  /**
   * @type {string}
   * @private
   */
  #path;

  /**
   * @constructor
   * @param {string} path
   * @param {Object} [options]
   * @param {Array<express.RequestHandler>} [options.middlewares=[]]
   */
  constructor(path, options = { middlewares: [] }) {
    /**@private */
    this.#router = express.Router();
    /**@private */
    /**@readonly */
    this.#path = path;

    this.#router.use(generateCustomResponse);
    const { middlewares } = options;
    middlewares.length > 0 && this.#router.use(middlewares);
    this.init();
  }

  /**
   * @public
   * @returns {void}
   */
  init() {}

  /**
   * @public
   * @readonly
   * @type {string}
   */
  get path() {
    return this.#path;
  }

  /**
   * @public
   * @readonly
   * @type {express.Router}
   */
  get router() {
    return this.#router;
  }
  /**
   * @public
   * @param {string} path
   * @param {string[]} policies
   * @param {...express.RequestHandler} callbacks
   */
  get(path, policies, ...callbacks) {
    this.#router.get(path, handlePolicies(policies), ...callbacks);
  }
  /**
   * @public
   * @param {string} path
   * @param {string[]} policies
   * @param {...express.RequestHandler} callbacks
   */
  post(path, policies, ...callbacks) {
    this.#router.post(path, handlePolicies(policies), ...callbacks);
  }
  /**
   * @public
   * @param {string} path
   * @param {string[]} policies
   * @param {...express.RequestHandler} callbacks
   */
  put(path, policies, ...callbacks) {
    this.#router.put(path, handlePolicies(policies), ...callbacks);
  }
  /**
   * @public
   * @param {string} path
   * @param {string[]} policies
   * @param {...express.RequestHandler} callbacks
   */
  delete(path, policies, ...callbacks) {
    this.#router.delete(path, handlePolicies(policies), ...callbacks);
  }
}

function generateCustomResponse(req, res, next) {
  res.okResponse = (payload) =>
    res.status(200).send({
      status: 'success',
      payload,
    });
  res.serverError = (error) => {
    res.status(500).send({
      status: 'error',
      error,
    });
  };
  res.userError = (error) => {
    res.status(400).send({
      status: 'error',
      error,
    });
  };
  next();
}

/**
 *
 * @param {string[]} policies
 */
function handlePolicies(policies) {
  return (req, res, next) => {
    if (policies.includes('PUBLIC')) {
      return next();
    }
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).send({ status: 'error', error: 'Unauthorized' });
    }
    /**@type {string} */
    const token = authHeader.split(' ')[1];
    const user = jwt.verify(token, 'CODER_SUPER_SECRETO');
    console.log(user);
    if (!policies.includes(user.user.role?.toUpperCase())) {
      return res.status(403).send({ status: 'error', error: 'Forbidden' });
    }
    req.user = user;
    next();
  };
}
