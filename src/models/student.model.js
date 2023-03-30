import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { courseCollection } from './courses.model.js';
import { userCollection } from './user.model.js';

export const studentCollection = 'estudiantes';

const studentSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true, min: 18, max: 99 },
  dni: { type: Number, required: true, unique: true },
  cursos: {
    type: [
      {
        curso: {
          type: mongoose.Schema.Types.ObjectId,
          ref: courseCollection,
        },
      },
    ],
    default: [],
  },
  nota: { type: Number, required: true, min: 1, max: 10 },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userCollection,
    default: null,
  },
});
studentSchema.plugin(mongoosePaginate);
studentSchema.pre('find', function () {
  this.populate(['usuario', 'cursos.curso']);
});

studentSchema.pre('findOne', function () {
  this.populate(['usuario', 'cursos.curso']);
});

export const studentModel = mongoose.model(studentCollection, studentSchema);
