import mongoose from 'mongoose';

const studentCollection = 'estudiantes';

const studentSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true, min: 18, max: 99 },
  dni: { type: Number, required: true, unique: true },
  curso: { type: String, required: true },
  nota: { type: Number, required: true, min: 1, max: 10 },
});

export const studentModel = mongoose.model(studentCollection, studentSchema);
