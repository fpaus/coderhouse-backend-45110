import jwt from 'jsonwebtoken';

const SECRET = 'CODER_SUPER_SECRETO';

function generateToken(user) {
  const token = jwt.sign({ user }, SECRET, { expiresIn: '24h' });
  return token;
}

function verifyJwt(token) {
  jwt.verify(token, SECRET, (err, data) => {
    if (err) {
      console.error('Token inválido');
      return;
    }
    console.log('Token válido');
    console.log(data);
  });
}

// console.log(
//   generateToken({
//     nombre: 'Fabrizio',
//     apellido: 'Pauselli',
//     edad: 31,
//   })
// );

verifyJwt(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5vbWJyZSI6IkZhYnJpemlvIiwiYXBlbGxpZG8iOiJQYXVzZWxsaSIsImVkYWQiOjMxfSwiaWF0IjoxNjgxNDI5NjQwLCJleHAiOjE2ODE1MTYwNDB9.0TjBU9YY1B2hUAc9c4vYFlDTn2F9MWrT6MBV01rcpAw'
);
