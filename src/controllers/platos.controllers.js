import { validationResult } from "express-validator";
import Plato from "../models/plato";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types; // Agrega esta línea para obtener el método ObjectId

// borrar varios platos por id
// agregar a favorito
//  listar los pedidos (lo tenes en listar usuario)

// editar hay que agregar datos

//controlador para obtener todos los platos
export const obtenerPlatos = async (req, res) => {
    try {
        const platos = await Plato.find();
        res.status(200).json(platos);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar los platos",
        });
    }
};

//controlador para crear un plato
export const crearPlato = async (req, res) => {
    try {
        console.log(req.body);
        const platoNuevo = new Plato(req.body);
        await platoNuevo.save();
        res.status(201).json({
            mensaje: "El plato fue creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al crear el plato",
        });
    }
};

//controlador para borrar un plato
export const borrarUnPlato = async (req, res) => {
    try {
        await Plato.findByIdAndDelete(req.params.id);
        res.status(200).json({
            mensaje: "El plato fue borrado",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al borrar el plato",
        });
    }
};

//controlador para editar un plato
export const editarPlato = async (req, res) => {
    try {
        //extraer el id del request y el body
        await Plato.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            mensaje: "El plato fue editado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al editar el plato",
        });
    }
};

//controlador para obtener un plato
export const obtenerUnPlato = async (req, res) => {
    try {
        const plato = await Plato.findById(req.params.id);
        res.status(200).json(plato);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar el plato",
        });
    }
};
