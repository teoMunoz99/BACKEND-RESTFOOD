import { Schema, model } from "mongoose";

const platoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  imagen: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  descripcion: {
    type: String,
    minlength: 3,
    maxlength: 800,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  categoria: {
    type: String,
    required: true,
    enum: [
      "entradas",
      "bebidas",
      "postres",
      "bebidasAlcoholicas",
      "comidasVeganas",
    ],
  },
});

const Plato = model("plato", platoSchema);

export default Plato;
