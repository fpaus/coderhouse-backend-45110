import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import { authenticated } from '../utils/middlewares/auth.js';

const route = Router();

route.get('/', (req, res) => {
  res.render('index');
});

route.get('/register', (req, res) => {
  const email = req.session.user;
  if (email) {
    return res.redirect('/perfil');
  }
  res.render('register', {
    style: 'style',
  });
});

route.get('/users/:id', async (req, res) => {
  const user = await usuarioManager.get(req.params.id);
  if (!user) {
    res.render('notFound', {
      style: 'style',
      entidad: 'Usuario',
    });
    return;
  }
  res.render('viewUsuario', {
    style: 'style',
    user,
  });
});

route.get('/mensaje', (req, res) => {
  res.render('mensaje');
});

route.get('/login', (req, res) => {
  const email = req.session.user;
  if (email) {
    return res.redirect('/perfil');
  }
  res.render('login');
});

route.get('/perfil', authenticated, async (req, res) => {
  const user = req.user;

  res.render('perfil', {
    nombre: user.nombre,
    apellido: user.apellido,
    edad: user.edad,
    email: user.email,
  });
});

route.get('/forgot-password', async (req, res) => {
  res.render('forgot-password');
});

export default route;
