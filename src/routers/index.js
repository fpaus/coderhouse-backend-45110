import { Router } from 'express';
import estudiantesRouter from './estudiantes.router.js';
import sessionRouter from './session.router.js';
import usuariosRouter from './usuarios.router.js';
import authRouter from './auth.router.js';
import jwtrouter from './jwt.router.js';
import dictionaryRouter from './dictionary.router.js';

const route = Router();
route.use(usuariosRouter.path, usuariosRouter.router);
route.use('/estudiantes', estudiantesRouter);
route.use('/session', sessionRouter);
route.use('/auth', authRouter);
route.use('/jwt', jwtrouter);
route.use('/dictionary', dictionaryRouter);

export default route;
