import { Router } from 'express';
import { userModel } from '../models/user.model.js';

const route = Router();

route.get('/', async (req, res, next) => {
  const { skip, limit, ...query } = req.query;

  try {
    const usuarios = await userModel.paginate(query, {
      skip: Number(skip ?? 0),
      limit: Number(limit ?? 10),
    });
    res.send({
      usuarios: usuarios.docs,
      total: usuarios.totalDocs,
      totalPages: usuarios.totalPages,
      hasNextPage: usuarios.hasNextPage,
      hasPrevPage: usuarios.hasPrevPage,
    });
  } catch (error) {
    next(error);
  }
});

route.get('/:idUsuario', async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;

    const usuario = await userModel.findOne({ _id: idUsuario });
    if (!usuario) {
      res
        .status(404)
        .send({ error: `Usuario con id ${idUsuario} no encontrado` });
      return;
    }
    res.send({ usuario });
  } catch (error) {
    next(error);
  }
});

route.post('/', async (req, res, next) => {
  const email = req.session.user;
  if (email) {
    return res.redirect('/perfil');
  }
  const usuario = req.body;

  try {
    const { _id } = await userModel.create(usuario);

    res.status(201).send({ id: _id });
  } catch (error) {
    next(error);
  }
});

route.put('/:idUsuario', async (req, res, next) => {
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

    await userModel.updateOne(
      { _id: idUsuario },
      { ...usuario, ...nuevosDatos }
    );
    res.send({ ok: true });
  } catch (error) {
    next(error);
  }
});

route.delete('/:idUsuario', async (req, res, next) => {
  try {
    const idUsuario = req.params.idUsuario;
    await userModel.deleteOne({ _id: idUsuario });
    res.send({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default route;
