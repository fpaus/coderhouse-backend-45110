import { Router } from 'express';
import { FileManager } from '../data/db.js';
import { validarMascota } from '../data/validacion.js';
import { userManager as usuarioManager } from '../managers/user.manager.js';
import { avatarUploader } from '../utils/avatarUploader.js';

const mascotasManager = new FileManager('../data/mascotas.json');

const route = Router();

route.get('/', async (req, res) => {
  const query = req.query;
  const entries = Object.entries(query);
  const todasLasMascotas = await mascotasManager.getAll();
  if (entries.length === 0) {
    return res.send({ mascotas: todasLasMascotas });
  }

  const filtrados = todasLasMascotas.filter((mascota) => {
    return entries.every(([key, value]) => mascota[key] == value);
  });
  res.send({ mascotas: filtrados });
});

route.post('/', avatarUploader.single('file'), async (req, res) => {
  const mascota = req.body;
  const file = req.file?.filename;
  console.log({ mascota, file });
  const esValido = validarMascota(mascota);
  if (!esValido) {
    res.status(400).send({
      error: 'Datos inválidos',
    });
    return;
  }
  const existeDueño = await usuarioManager.get(mascota.duenio);
  if (!existeDueño) {
    res.status(404).send({
      error: 'Dueño inexistente',
    });
    return;
  }
  const id = await mascotasManager.crear({ ...mascota, thumbnail: file });
  console.log(mascota);
  res.status(201).send({ id });
});

route.get('/:idMascota', async (req, res) => {
  const idMascota = req.params.idMascota;
  const mascota = await mascotasManager.get(idMascota);
  if (!mascota) {
    res
      .status(404)
      .send({ error: `Mascota con id ${idMascota} no encontrado` });
    return;
  }
  res.send({ mascota });
});

export default route;
