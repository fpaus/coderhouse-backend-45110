async function send(event) {
  event.preventDefault();
  const nombre = document.getElementById('form-name').value;
  const apellido = document.getElementById('form-last-name').value;
  const email = document.getElementById('form-email').value;

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      nombre,
      apellido,
      email,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    response.json().then((d) => {
      const p = document.getElementById('usuario-id');
      p.innerText = `Usuario Registrado con id ${d.id}`;
    });
  }
}
