import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    match: /^\S+@\S+\.\S+$/,
  },
  contrasenia: {
    type: String,
    required: true,
    minlength: 6,
  },
  imagen: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ["activo", "suspendido"],
    required: true,
  },
  rol: {
    type: String,
    enum: ["usuario", "administrador"],
    required: true,
  },
  pedidos: [],
  favoritos: {
    type: [String],
    default: [],
  },
  carrito: [],
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
