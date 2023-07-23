import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100,
        match: /^\S+@\S+\.\S+$/
    },
    contrasenia: {
        type: String,
        required: true,
        minlength: 6
    },
    imagen: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'], // Estado debe ser 'activo' o 'inactivo'
        required: true
    },
    rol: {
        type: String,
        enum: ['usuario', 'administrador'], // Rol debe ser 'usuario' o 'administrador'
        required: true
    },
    pedido: {
        type: [String],
        default: [] 
    },
    favoritos: {
        type: [String],
        default: []
    },
    carrito: {
        type: [String],
        default: []
    }
});


const Usuario = mongoose.model('usuario', usuarioSchema)

export default Usuario;