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

export default route;
