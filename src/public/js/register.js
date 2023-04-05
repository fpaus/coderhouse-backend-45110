async function send(event) {
  event.preventDefault();
  const nombre = document.getElementById('form-name').value;
  const apellido = document.getElementById('form-last-name').value;
  const email = document.getElementById('form-email').value;
  const edad = document.getElementById('form-edad').value;
  const password = document.getElementById('form-password').value;

  api
    .post('/api/usuarios', {
      nombre,
      apellido,
      email,
      edad,
      password,
    })
    .then((d) => alert('Usuario Registrado'));
}
//   await fetch('/api/usuarios', {
//     method: 'POST',
//     body: JSON.stringify({
//       nombre,
//       apellido,
//       email,
//       edad, password
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   if (response.ok) {
//     response.json().then((d) => {
//       alert('Usuario Registrado')
//     });
//   }
// }
