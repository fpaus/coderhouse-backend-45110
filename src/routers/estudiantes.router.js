import { Router } from 'express';
import { studentModel } from '../models/student.model.js';
const route = Router();

route.get('/', async (req, res, next) => {
  try {
    const { skip, limit, ...query } = req.query;
    const estudiantes = await studentModel.paginate(query, {
      skip: Number(skip ?? 0),
      limit: Number(limit ?? 10),
      lean: true,
    });
    res.send({
      estudiantes: estudiantes.docs,
      total: estudiantes.totalDocs,
      totalPages: estudiantes.totalPages,
      hasNextPage: estudiantes.hasNextPage,
      hasPrevPage: estudiantes.hasPrevPage,
    });
  } catch (error) {
    next(error);
  }
});

route.get('/:estudianteID', async (req, res, next) => {
  const estudianteId = req.params.estudianteID;
  try {
    const estudiante = await studentModel.findOne({ _id: estudianteId });
    if (!estudiante) {
      res
        .status(404)
        .send({ error: `Estudiante con id ${estudianteId} no encontrado` });
      return;
    }
    res.send({ estudiante });
  } catch (error) {
    next(error);
  }
});

route.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const newStudent = await studentModel.create(data);
    res.status(201).send({ id: newStudent._id });
  } catch (error) {
    next(error);
  }
});

route.put('/:estudianteID', async (req, res, next) => {
  try {
    const estudianteId = req.params.estudianteID;
    const data = req.body;
    const usuarioExiste = await studentModel.findOne({ _id: estudianteId });
    if (!usuarioExiste) {
      res
        .status(404)
        .send({ error: `Estudiante con id ${estudianteId} no encontrado` });
      return;
    }
    await studentModel.updateOne(
      { _id: estudianteId },
      { ...usuarioExiste, ...data },
    );
    res.send({ id: estudianteId });
  } catch (error) {
    next(error);
  }
});

route.delete('/:estudianteID', async (req, res, next) => {
  try {
    const estudianteId = req.params.estudianteID;
    await studentModel.deleteOne({ _id: estudianteId });
    res.send({ ok: true });
  } catch (error) {
    next(error);
  }
});

export default route;
