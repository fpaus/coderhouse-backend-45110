const socket = io();
socket.emit('nombre_mensaje', 'Data enviada desde el fronted');

socket.on('evento_individual', (data) =>
  mostrarMensajes('evento_individual:', data),
);
socket.on('evento_para_el_resto', (data) =>
  mostrarMensajes('evento_para_el_resto:', data),
);
socket.on('evento_para_todos', (data) =>
  mostrarMensajes('evento_para_todos:', data),
);

function mostrarMensajes(...mensajes) {
  const mensaje = mensajes.join(' ');
  const div = document.querySelector('#mensajes');
  const p = document.createElement('p');
  p.innerHTML = mensaje;
  div.appendChild(p);
}

function mgsPrueba() {
  socket.emit('prueba_emision', 'Data enviada desde el fronted');
}
