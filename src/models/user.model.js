import mongoose from 'mongoose';

const userCollection = 'usuarios';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const userModel = mongoose.model(userCollection, userSchema);
