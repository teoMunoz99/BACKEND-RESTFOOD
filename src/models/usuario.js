import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
    domicilio: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    nombreProducto: {
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
        type: String,
        required: true,
    },
});

const usuarioSchema = new Schema({
    nombreUsuario: {
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
        minlength: 8,
    },
    imagen: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        enum: ["activo", "inactivo"], // Estado debe ser 'activo' o 'inactivo'
        required: true,
    },
    rol: {
        type: String,
        enum: ["usuario", "administrador"], // Rol debe ser 'usuario' o 'administrador'
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
    carrito: {
        type: [String],
        default: [],
    },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
