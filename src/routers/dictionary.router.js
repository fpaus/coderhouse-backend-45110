import { Router } from 'express';
import { Db } from 'mongodb';

const route = Router();
const pets = [];

route.param('word', (req, res, next, word) => {
  console.log('La palabra es:', word);
  req.word = word;
  next();
});

route.param('pet', (req, res, next, pet) => {
  const existintPet = pets.find(pet);
  if (!existintPet) {
    res.status(404).send('pet not found');
    return;
  }
  req.pet = existintPet;
  next();
});

route.post('/', (req, res) => {
  pets.push(req.body);
  res.status(201).send('created');
});

route.get('/:pet([a-zA-Z]+)', (req, res) => {
  res.send(req.pet);
});

route.get('/:word([a-z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)', (req, res) => {
  res.send({
    word: req.word,
  });
});

route.get('/:number([0-9]+)', (req, res) => {
  res.send({
    number: req.params.number,
  });
});

route.get('/*', (req, res) => {
  res.send({
    unknown: req.params[0],
  });
});

export default route;
