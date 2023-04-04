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
    secret: config.cookie_secret,
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoute);
app.use('/api', routes);

const auth = (req, res, next) => {
  const admin = req.sessions.admin;
  if (admin) {
    next();
  } else {
    res.status(401).send({ error: 'No autorizado' });
  }
};

app.get('/setCookie', (req, res) => {
  res
    .cookie('prueba', 'Mi primera cookie', { maxAge: 10000, signed: true })
    .send('Se creó una cookie');
});
app.get('/getCookies', (req, res) => {
  const cookies = req.cookies;
  const signedCookies = req.signedCookies;
  console.log(cookies);
  res.send({ cookies, signedCookies });
});
app.get('/deleteCookies', (req, res) => {
  res.clearCookie('prueba').send('Se borró la cookie');
});

app.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send({ counter: req.session.counter });
  } else {
    req.session.counter = 1;
    res.send({ counter: req.session.counter, primeraVez: true });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ logout: 'ok' });
    }
  });
});

app.get('/login', (req, res) => {
  const { username, password } = req.query;
  if (username !== 'admin' || password !== 'admin') {
    res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
    return;
  }
  req.session.user = username;
  req.session.admin = true;
  res.send({ login: 'ok' });
});

app.get('/autorizado', auth, (req, res) => {
  res.send({ autorizado: 'ok' });
});
app.get('/autorizado', auth, (req, res) => {
  res.send({ autorizado: 'ok' });
});

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
