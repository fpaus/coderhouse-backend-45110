import mongoose from 'mongoose';
import { userCollection } from './user.model.js';

export const courseCollection = 'cursos';

const courseSchema = mongoose.Schema({
  titulo: String,
  descripcion: String,
  dificultad: Number,
  topicos: {
    type: Array,
    default: [],
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userCollection,
  },
  estudiantes: {
    type: Array,
    default: [],
  },
});

courseSchema.pre('find', function () {
  this.populate(['profesor']);
});

courseSchema.pre('findOne', function () {
  this.populate(['profesor']);
});

export const courseModel = mongoose.model(courseCollection, courseSchema);
