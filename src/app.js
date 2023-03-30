import express from 'express';
import mongoose from 'mongoose';
import { config } from '../config.js';
import { ValidationError } from './classes/errors/validation-exception.js';
import configureHandlebars from './lib/handlebars/hbs.middleware.js';
import routes from './routes/index.js';
import viewsRoute from './routes/views.route.js';
import configureSocket from './socket/configure-socket.js';
import fileDirName from './utils/fileDirName.js';
const { __dirname } = fileDirName(import.meta);
const { port, mongo_url } = config;
const app = express();
configureHandlebars(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoute);
app.use('/api', routes);

app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      error: error.mensaje,
    });
  }
  res.status(500).json({ error });
});

const httpServer = app.listen(port, () =>
  console.log(`Servidor escuchando en el puerto ${port}`),
);
configureSocket(httpServer);

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
