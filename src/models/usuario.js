import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  domicilio: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  nombresProductos: {
    type: [String],
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  envio: {
    type: [Number],
    required: true,
  },
});

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
  pedido: {
    type: [pedidoSchema],
    default: [],
  },
  favoritos: {
    type: [String],
    default: [],
  },
  carrito: [],
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
