import Plato from "../models/plato";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

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

export const crearPlato = async (req, res) => {
  try {
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

export const borrarPlato = async (req, res) => {
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

export const editarPlato = async (req, res) => {
  try {
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

export const obtenerPlato = async (req, res) => {
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

export const borrarVariosPlatos = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        mensaje: "Debe proporcionar un array de IDs válidos.",
      });
    }

    const deleteResult = await Plato.deleteMany({ _id: { $in: ids } });
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron platos con los IDs proporcionados.",
      });
    }

    res.status(200).json({
      mensaje: "Platos borrados exitosamente.",
      cantidadBorrada: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al borrar los platos.",
    });
  }
};
