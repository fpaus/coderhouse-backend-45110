import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const userCollection = 'usuarios';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number, required: true },
  password: { type: String, required: true },
});
userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);
