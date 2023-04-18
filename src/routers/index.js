import { Router } from 'express';
import estudiantesRouter from './estudiantes.router.js';
import sessionRouter from './session.router.js';
import usuariosRouter from './usuarios.router.js';
import authRouter from './auth.router.js';
import jwtrouter from './jwt.router.js';

const route = Router();
route.use('/usuarios', usuariosRouter);
route.use('/estudiantes', estudiantesRouter);
route.use('/session', sessionRouter);
route.use('/auth', authRouter);
route.use('/jwt', jwtrouter);

export default route;
