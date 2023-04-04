import { Router } from 'express';
const route = Router();

export default route;

route.get('/', (req, res) => {
  const { nombre } = req.query;
  req.session.nombre = req.session.nombre ?? nombre;
  req.session.cantidadVisitas = req.session.cantidadVisitas
    ? req.session.cantidadVisitas + 1
    : 1;
  const mensaje =
    req.session.cantidadVisitas === 1
      ? `Bienvenido ${req.session.nombre ?? ''}`
      : `${req.session.nombre ?? ''} visitaste el sitio ${
          req.session.cantidadVisitas
        } veces`;
  res.send(mensaje);
});
