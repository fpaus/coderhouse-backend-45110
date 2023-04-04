app.get('/setCookie', (req, res) => {
  res
    .cookie('prueba', 'Mi primera cookie', { maxAge: 10000, signed: true })
    .send('Se creó una cookie');
});
app.get('/getCookies', (req, res) => {
  const cookies = req.cookies;
  const signedCookies = req.signedCookies;
  console.log(cookies);
  res.send({ cookies, signedCookies });
});
app.get('/deleteCookies', (req, res) => {
  res.clearCookie('prueba').send('Se borró la cookie');
});
