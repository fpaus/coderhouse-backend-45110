import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import { authenticated } from '../utils/middlewares/auth.js';

const route = Router();

route.post('/login', async (req, res) => {
  const alreadyEmail = req.session.user;
  if (alreadyEmail) {
    return res.redirect('/perfil');
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email, password });
  if (!user) {
    return res.status(401).send({
      error: 'email o contraseña incorrectos',
    });
  }
  req.session.user = email;
  res.redirect('/perfil');
});

route.post('/logout', authenticated, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.redirect('/login');
    }
  });
});

export default route;
