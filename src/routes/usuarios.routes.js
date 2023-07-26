import { Router } from "express";
import { check } from "express-validator";
import resultadoValidacion from "../helpers/resultadoValidacion";
import {
  listarUsuarios,
  crearUsuario,
  login,
  editarEstadoUsuario,
  crearPedido
} from "../controllers/usuario.controllers";
import validarUsuario from "../helpers/validarUsuario";


const router = Router();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


router.route("/")
  .get(listarUsuarios)
  .post([
    check("email", "El email es obligatorio").isEmail()
    .matches(emailRegex).withMessage("El email debe tener un formato válido"),
    check("contrasenia", "La contraseña debe contener 6 caracteres como minimo").isLength({min:6}),
    resultadoValidacion
  ],
  login);
router.route("/nuevo").post(validarUsuario, crearUsuario);

router.route("/editarEstadoUsuario/:email").post([
  check("estado", "El estado es obligatorio").notEmpty(),
  resultadoValidacion
], editarEstadoUsuario);

router.route("/crearPedido").post(crearPedido);

export default router;