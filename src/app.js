import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { config } from '../config.js';
import { ValidationError } from './classes/errors/validation-exception.js';
import configureHandlebars from './lib/handlebars/hbs.middleware.js';
import routes from './routers/index.js';
import viewsRoute from './routers/views.router.js';
import configureSocket from './socket/configure-socket.js';
import fileDirName from './utils/fileDirName.js';

const { __dirname } = fileDirName(import.meta);
const { port, mongo_url } = config;
const app = express();
configureHandlebars(app);

app.use(cookieParser(config.cookie_secret));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongo_url,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15,
    }),
    secret: config.cookie_secret,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoute);
app.use('/api', routes);

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      error: error.mensaje,
    });
  }
  res.status(500).json({ error });
});

const httpServer = app.listen(port, () =>
  console.log(`Servidor escuchando en el puerto ${port}`)
);
configureSocket(httpServer);

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
