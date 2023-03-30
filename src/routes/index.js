import { Router } from 'express';
import estudiantesRouter from './estudiantes.route.js';
import usuariosRouter from './usuarios.route.js';

const route = Router();
route.use('/usuarios', usuariosRouter)
route.use('/estudiantes', estudiantesRouter)

export default route;