import { Router } from "express";
import { check } from "express-validator";
import resultadoValidacion from "../helpers/resultadoValidacion";
import {
  listarUsuarios,
  crearUsuario,
  login,
} from "../controllers/usuario.controllers";
import validarUsuario from "../helpers/validarUsuario";

const router = Router();

//agregar las validaciones con express-validator

router.route("/").get(listarUsuarios);
router.route("/nuevo").post(validarUsuario, crearUsuario);

//router
  /*.route("/")
  .post(
    [
      check("email", "El email es obligatorio").isEmail(),
      check(
        "password",
        "El password debe contener 6 caracteres como minimo"
      ).isLength({ min: 6 }),
      resultadoValidacion,
    ],
    login
  )
  .get(listarUsuarios);*/

/*router.route("/nuevo").post(
  [
    check("nombreUsuario", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 6 caracteres")
      .isLength({
        min: 6,
        max: 15,
      })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage(
        "El password debe contener 8 caracteres (al menos 1 letra mayúscula, 1 letra minúscula y 1 numero) también puede incluir carácteres especiales"
      ),
    resultadoValidacion,
  ],
  crearUsuario
);*/

export default router;