import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validarUsuario = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre de usuario es un dato obligatorio")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre de usuario debe tener entre 3 y 50 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El email es un dato obligatorio")
    .isEmail()
    .withMessage("El email debe tener un formato válido")
    .isLength({ max: 100 })
    .withMessage("El email debe tener máximo 100 caracteres"),
  check("contrasenia")
    .notEmpty()
    .withMessage("La contraseña es un dato obligatorio")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  check("imagen").notEmpty().withMessage("Es necesario agregar una imagen"),
  check("estado")
    .notEmpty()
    .withMessage("El estado es un dato obligatorio")
    .isIn(["activo", "suspendido"])
    .withMessage("El estado debe ser 'activo' o 'suspendido'"),
  check("rol")
    .notEmpty()
    .withMessage("El rol es un dato obligatorio")
    .isIn(["usuario", "administrador"])
    .withMessage("El rol debe ser 'usuario' o 'administrador'"),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validarUsuario;
