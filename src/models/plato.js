import { Schema, model } from 'mongoose'

const platoSchema = new Schema({
    nombre: {
        type: String,
        required: true, // El campo es obligatorio
        minlength: 3,   // La longitud mínima del campo debe ser de al menos 3 caracteres
        maxlength: 100  // La longitud máxima del campo debe ser de 100 caracteres como máximo
    },
    imagen: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        enum: ['entradas', 'bebidas', 'postres', 'bebidasAlcoholicas', 'comidasVeganas']
    }
});

const Plato = model('plato', platoSchema);

export default Plato;