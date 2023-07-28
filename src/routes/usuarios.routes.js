import { Router } from "express";
import { check } from "express-validator";
import resultadoValidacion from "../helpers/resultadoValidacion";
import {
  crearUsuario,
  login,
  editarEstadoUsuario,
  crearPedido,
  eliminarUsuario,
  editarUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  agregarFavoritos,
} from "../controllers/usuario.controllers";
import validarUsuario from "../helpers/validarUsuario";

const router = Router();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

router
  .route("/")
  .get(obtenerUsuarios)
  .post(
    [
      check("email", "El email es obligatorio")
        .isEmail()
        .matches(emailRegex)
        .withMessage("El email debe tener un formato válido"),
      check(
        "contrasenia",
        "La contraseña debe contener 6 caracteres como minimo"
      ).isLength({ min: 6 }),
      resultadoValidacion,
    ],
    login
  );
router.route("/nuevo").post(validarUsuario, crearUsuario);
router
  .route("/usuario/:id")
  .delete(eliminarUsuario)
  .put(validarUsuario, editarUsuario)
  .get(obtenerUsuario);

router.route("/crearPedido").post(crearPedido);
router.route("/cargarFavoritos").post(agregarFavoritos);

export default router;
