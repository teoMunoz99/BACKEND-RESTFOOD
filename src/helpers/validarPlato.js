import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion";

const validarPlato = [
  check("nombre")
    .notEmpty()
    .withMessage("El nombre del plato es un dato obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre del plato debe tener entre 3 y 100 caracteres"),
  check("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un numero")
    .custom((value) => {
      if (value >= 0) {
        return true;
      } else {
        throw new Error("El precio debe ser mayor o igual a 0");
      }
    }),
  check("imagen").notEmpty().withMessage("Es necesario agregar una imagen"),
  check("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn([
      "entradas",
      "bebidas",
      "postres",
      "bebidasAlcoholicas",
      "comidasVeganas",
    ])
    .withMessage("Debe agregar una categoria valida"),
  check("descripcion")
    .notEmpty()
    .withMessage("Es necesario agregar una descripcion")
    .isLength({ min: 3, max: 800 })
    .withMessage("La descripcion debe tener entre 3 y 800 caracteres"),
  check("stock")
    .notEmpty()
    .withMessage("El stock es un dato obligatorio")
    .isNumeric()
    .withMessage("El stock debe ser un numero")
    .custom((value) => {
      if (value >= 0) {
        return true;
      } else {
        throw new Error("El stock debe ser mayor o igual a 0");
      }
    }),
  (req, res, next) => {
    resultadoValidacion(req, res, next);
  },
];

export default validarPlato;
