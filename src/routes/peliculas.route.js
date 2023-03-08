import { Router } from 'express';
import { FileManager } from '../data/db.js';
import { validarPelicula, validarPeliculaParcial } from '../data/validacion.js';
const peliculasManager = new FileManager('./data/peliculas.json');
const route = Router();
route.get('/', async (req, res) => {
  const query = req.query;
  const entries = Object.entries(query);
  const todasLasPeliculas = await peliculasManager.getAll();
  if (entries.length === 0) {
    return res.send({ peliculas: todasLasPeliculas });
  }

  const filtrados = todasLasPeliculas.filter((Pelicula) => {
    return entries.every(([key, value]) => Pelicula[key] == value);
  });
  res.send({ peliculas: filtrados });
});

route.get('/:idPelicula', async (req, res) => {
  const idPelicula = req.params.idPelicula;
  const Pelicula = await peliculasManager.get(idPelicula);
  if (!Pelicula) {
    res
      .status(404)
      .send({ error: `Pelicula con id ${idPelicula} no encontrado` });
    return;
  }
  res.send({ Pelicula });
});

route.post('', async (req, res) => {
  const Pelicula = req.body;
  const esValido = validarPelicula(Pelicula);
  if (!esValido) {
    res.status(400).send({
      error: 'Datos inválidos',
    });
    return;
  }
  const id = await peliculasManager.crear(Pelicula);
  console.log(Pelicula);
  res.status(201).send({ id });
});

route.put('/:idPelicula', async (req, res) => {
  const idPelicula = req.params.idPelicula;
  const Pelicula = await peliculasManager.get(idPelicula);
  if (!Pelicula) {
    res
      .status(404)
      .send({ error: `Pelicula con id ${idPelicula} no encontrado` });
    return;
  }
  const nuevosDatos = req.body;
  const esValido = validarPelicula(nuevosDatos);
  if (!esValido) {
    res.status(400).send({
      error: 'Datos inválidos',
    });
    return;
  }
  await peliculasManager.modificar(idPelicula, nuevosDatos);
  res.send({ ok: true });
});

route.patch('/:idPelicula', async (req, res) => {
  const idPelicula = req.params.idPelicula;
  const Pelicula = await peliculasManager.get(idPelicula);
  if (!Pelicula) {
    res
      .status(404)
      .send({ error: `Pelicula con id ${idPelicula} no encontrado` });
    return;
  }
  const nuevosDatos = req.body;
  const esValido = validarPeliculaParcial(nuevosDatos);
  if (!esValido) {
    res.status(400).send({
      error: 'Datos inválidos',
    });
    return;
  }
  await peliculasManager.modificar(idPelicula, nuevosDatos);
  res.send({ ok: true });
});

route.delete('/:idPelicula', async (req, res) => {
  const idPelicula = req.params.idPelicula;
  const Pelicula = await peliculasManager.get(idPelicula);
  if (!Pelicula) {
    res
      .status(404)
      .send({ error: `Pelicula con id ${idPelicula} no encontrado` });
    return;
  }
  await peliculasManager.eliminar(idPelicula);
  res.send({ ok: true });
});

export default route;
