import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const studentCollection = 'estudiantes';

const studentSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number, required: true, min: 18, max: 99 },
  dni: { type: Number, required: true, unique: true },
  cursos: { type: Array, required: true },
  nota: { type: Number, required: true, min: 1, max: 10 },
});
studentSchema.plugin(mongoosePaginate)

export const studentModel = mongoose.model(studentCollection, studentSchema);
