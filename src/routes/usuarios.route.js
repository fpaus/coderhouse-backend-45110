import { Router } from 'express';
import { BadRequestException } from '../classes/errors/bad-request-exception.js';
import { validarUsuario, validarUsuarioParcial } from '../data/validacion.js';
import { userManager as usuarioManager } from '../managers/user.manager.js';
// const usuarioManager = new FileManager('../data/usuarios.json');
const route = Router();

route.use(async (req, res, next) => {
  console.log(req.url, Date.now());

  next();
});

route.get('/', async (req, res) => {
  const query = req.query;
  const entries = Object.entries(query);
  const todosLosUsuarios = await usuarioManager.getAll();
  if (entries.length === 0) {
    return res.send({ usuarios: todosLosUsuarios });
  }

  const filtrados = todosLosUsuarios.filter((usuario) => {
    return entries.every(([key, value]) => usuario[key] == value);
  });
  res.send({ usuarios: filtrados });
});

route.get('/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const usuario = await usuarioManager.get(idUsuario);
  if (!usuario) {
    res
      .status(404)
      .send({ error: `Usuario con id ${idUsuario} no encontrado` });
    return;
  }
  res.send({ usuario });
});

route.post('', async (req, res, next) => {
  const usuario = req.body;
  console.log(usuario);
  const esValido = validarUsuario(usuario);
  if (!esValido) {
    next(new BadRequestException('Datos inválidos'));
    return;
  }
  const id = await usuarioManager.crear(usuario);
  console.log(usuario);
  res.status(201).send({ id });
});

route.put('/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const usuario = await usuarioManager.get(idUsuario);
  if (!usuario) {
    res
      .status(404)
      .send({ error: `Usuario con id ${idUsuario} no encontrado` });
    return;
  }
  const nuevosDatos = req.body;
  const esValido = validarUsuario(nuevosDatos);
  if (!esValido) {
    res.status(400).send({
      error: 'Datos inválidos',
    });
    return;
  }
  await usuarioManager.modificar(idUsuario, nuevosDatos);
  res.send({ ok: true });
});

route.patch('/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const usuario = await usuarioManager.get(idUsuario);
  if (!usuario) {
    res
      .status(404)
      .send({ error: `Usuario con id ${idUsuario} no encontrado` });
    return;
  }
  const nuevosDatos = req.body;
  const esValido = validarUsuarioParcial(nuevosDatos);
  if (!esValido) {
    res.status(400).send({
      error: 'Datos inválidos',
    });
    return;
  }
  await usuarioManager.modificar(idUsuario, nuevosDatos);
  res.send({ ok: true });
});

route.delete('/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const usuario = await usuarioManager.get(idUsuario);
  if (!usuario) {
    res
      .status(404)
      .send({ error: `Usuario con id ${idUsuario} no encontrado` });
    return;
  }
  await usuarioManager.eliminar(idUsuario);
  res.send({ ok: true });
});

export default route;
