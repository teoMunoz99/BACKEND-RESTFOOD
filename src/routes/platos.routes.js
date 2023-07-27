import { Router } from "express";
import {
  crearPlato,
  obtenerPlatos,
  editarPlato,
  obtenerPlato,
  borrarPlato,
  borrarVariosPlatos
} from "../controllers/platos.controllers";
import validarPlato from "../helpers/validarPlato";

const router = Router();


router.route("/platos/borrarVarios").delete(borrarVariosPlatos);
router.route("/platos").get(obtenerPlatos).post(validarPlato, crearPlato);
router
  .route("/platos/:id")
  .delete(borrarPlato)
  .put(editarPlato)
  .get(obtenerPlato);


export default router;
