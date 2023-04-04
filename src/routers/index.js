import { Router } from 'express';
import estudiantesRouter from './estudiantes.router.js';
import sessionRouter from './session.router.js';
import usuariosRouter from './usuarios.router.js';

const route = Router();
route.use('/usuarios', usuariosRouter);
route.use('/estudiantes', estudiantesRouter);
route.use('/session', sessionRouter);

export default route;
