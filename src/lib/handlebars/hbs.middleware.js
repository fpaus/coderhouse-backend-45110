import { create } from 'express-handlebars';
import fileDirName from '../../utils/fileDirName.js';
import helpers from './hbs.helpers.js';

const { __dirname } = fileDirName(import.meta);
/**
 * @typedef {import("express").Express} Express
 */

/**
 * It is responsible for configuring the Handlebars view engine for an Express application by setting up the engine, views directory, and view engine.
 *
 * @function
 * @name configureHandlebars
 * @kind function
 * @param {Express} app
 * @returns {void}
 * @exports
 */
export default function configureHandlebars(app) {
  const hbs = create({
    partialsDir: [`${__dirname}/../../views/partials`],
    helpers,
  });
  app.engine('handlebars', hbs.engine);
  app.set('views', `${__dirname}/../../views`);
  app.set('view engine', 'handlebars');
}
