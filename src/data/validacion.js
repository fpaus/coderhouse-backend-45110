const usuarioKeys = ['nombre', 'apellido', 'email'];
const peliculaKeys = ['nombre', 'anio', 'genero'];
const mascotasKeys = ['especie', 'nombre', 'duenio'];

function validar(data, keys) {
  const dataKeys = Object.keys(data);
  return (
    keys.every((key) => dataKeys.includes(key)) &&
    dataKeys.every((key) => keys.includes(key))
  );
}

function validarParcial(data, keys) {
  const dataKeys = Object.keys(data);
  return (
    dataKeys.length <= keys.length &&
    dataKeys.every((key) => keys.includes(key))
  );
}

export function validarUsuario(maybeUsuario) {
  return validar(maybeUsuario, usuarioKeys);
}
export function validarUsuarioParcial(maybeUsuarioParcial) {
  return validarParcial(maybeUsuarioParcial, usuarioKeys);
}

export function validarPelicula(maybePelicula) {
  return validar(maybePelicula, peliculaKeys);
}

export function validarPeliculaParcial(maybePeliculaParcial) {
  return validarParcial(maybePeliculaParcial, peliculaKeys);
}

export function validarMascota(maybeMascota) {
  return validar(maybeMascota, mascotasKeys);
}

export function validarMascotaParcial(maybeMascotaParcial) {
  return validarParcial(maybeMascotaParcial, mascotasKeys);
}
