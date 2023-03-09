import express from 'express';
import { ValidationError } from './classes/errors/validation-exception.js';
import configureHandlebars from './lib/handlebars/hbs.middleware.js';
import mascotasRoute from './routes/mascotas.route.js';
import peliculasRoute from './routes/peliculas.route.js';
import usuarioRoute from './routes/usuarios.route.js';
import viewsRoute from './routes/views.route.js';
import configureSocket from './socket/configure-socket.js';
import fileDirName from './utils/fileDirName.js';
const { __dirname } = fileDirName(import.meta);

const app = express();
configureHandlebars(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRoute);
app.use('/api/users', usuarioRoute);
app.use('/api/movies', peliculasRoute);
app.use('/api/pets', mascotasRoute);

app.use((error, req, res, next) => {
  console.error({ error });
  if (error instanceof ValidationError) {
    res.status(error.code).json(error.mensaje);
  }
  res.status(500).json({ error });
});

const port = 8080;
const httpServer = app.listen(port, () =>
  console.log(`Servidor de la clase 8 escuchando en el puerto ${port}`),
);
configureSocket(httpServer);
