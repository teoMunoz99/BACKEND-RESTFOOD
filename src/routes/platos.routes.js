import { Router } from "express";
import {
    crearPlato,
    obtenerPlatos,
    borrarUnPlato,
    editarPlato,
    obtenerUnPlato,
    borrarPlatos,
} from "../controllers/platos.controllers";
import validarPlato from "../helpers/validarPlato";

const router = Router();

router
    .route("/platos")
    .get(obtenerPlatos)
    .post( validarPlato ,crearPlato);
router
    .route("/platos/:id")
    .delete(borrarUnPlato)
    .put(editarPlato)
    .get(obtenerUnPlato);

export default router;
