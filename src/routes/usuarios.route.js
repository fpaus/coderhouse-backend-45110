import { Router } from 'express';
import { validarUsuario, validarUsuarioParcial } from '../data/validacion.js';
import { userModel } from '../models/user.model.js';
// const usuarioManager = new FileManager('../data/usuarios.json');
const route = Router();

route.get('/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  // const usuario = await usuarioManager.get(idUsuario);
  const usuario = await userModel.findOne({ _id: idUsuario });
  if (!usuario) {
    res
      .status(404)
      .send({ error: `Usuario con id ${idUsuario} no encontrado` });
    return;
  }
  res.send({ usuario });
});

route.get('/', async (req, res, next) => {
  const { skip, limit, ...query } = req.query;

  try {
    const usuarios = await userModel
      .find(query)
      .skip(Number(skip ?? 0))
      .limit(Number(limit ?? 10));
    res.send({ usuarios });
  } catch (error) {
    next(error);
  }
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
  try {
    const { _id } = await userModel.create(usuario);
    console.log(usuario);
    res.status(201).send({ id: _id });
  } catch (error) {
    next(error);
  }
});

route.put('/:idUsuario', async (req, res, next) => {
  const idUsuario = req.params.idUsuario;
  // const usuario = await usuarioManager.get(idUsuario);
  try {
    const usuario = await userModel.find({ _id: idUsuario });
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
    // await usuarioManager.modificar(idUsuario, nuevosDatos);
    await userModel.updateOne({ _id: idUsuario }, nuevosDatos);
    res.send({ ok: true });
  } catch (error) {
    next(error);
  }
});

route.patch('/:idUsuario', async (req, res, next) => {
  const idUsuario = req.params.idUsuario;
  try {
    const usuario = await userModel.find({ _id: idUsuario });
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
    await userModel.updateOne({ _id: idUsuario }, nuevosDatos);
    res.send({ ok: true });
  } catch (error) {
    next(error);
  }
});

route.delete('/:idUsuario', async (req, res) => {
  const idUsuario = req.params.idUsuario;
  // const usuario = await usuarioManager.get(idUsuario);
  // if (!usuario) {
  //   res
  //     .status(404)
  //     .send({ error: `Usuario con id ${idUsuario} no encontrado` });
  //   return;
  // }
  // await usuarioManager.eliminar(idUsuario);
  await userModel.deleteOne({ _id: idUsuario });
  res.send({ ok: true });
});

export default route;
