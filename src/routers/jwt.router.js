import { Router } from 'express';
import { userModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { passportCall, authorization } from '../utils/middlewares/auth.js';

const SECRET = 'CODER_SUPER_SECRETO';

const users = [];
const route = Router();

route.post('/register', (req, res) => {
  //validaciones
  const user = req.body;
  users.push(user);
  const token = generateToken({ ...user, role: 'ADMIN' });
  res.cookie('AUTH', token, {
    maxAge: 60 * 60 * 1000 * 24,
    httpOnly: true,
  });
  res.send({ token });
});

route.get(
  '/data',
  // passport.authenticate('jwt', { session: false }),
  passportCall('jwt'),
  authorization('ADMIN'),
  (req, res) => {
    res.send(req.user);
  }
);

function generateToken(user) {
  const token = jwt.sign({ user }, SECRET, { expiresIn: '24h' });
  return token;
}

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  // authHeader = 'Bearer TOKEN'
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = payload.user;
    next();
  });
}

export default route;
