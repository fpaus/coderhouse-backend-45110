import { create } from 'express-handlebars';
import fileDirName from '../../utils/fileDirName.js';
import helpers from './hbs.helpers.js';

const { __dirname } = fileDirName(import.meta);
export default function configureHandlebars(app) {
  const hbs = create({
    partialsDir: [`${__dirname}/../../views/partials`],
    helpers,
  });
  app.engine('handlebars', hbs.engine);
  app.set('views', `${__dirname}/../../views`);
  app.set('view engine', 'handlebars');
}
