import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
  res.render('index');
});

route.get('/register', (req, res) => {
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

route.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.send({ logout: 'ok' });
    }
  });
});

route.get('/login', (req, res) => {
  const { username, password } = req.query;
  if (username !== 'admin' || password !== 'admin') {
    res.status(401).send({ error: 'Usuario o contraseña incorrectos' });
    return;
  }
  req.session.user = username;
  req.session.admin = true;
  res.send({ login: 'ok' });
});

export default route;
