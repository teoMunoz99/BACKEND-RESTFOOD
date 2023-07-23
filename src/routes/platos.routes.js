import { Router} from "express";
import { crearPlato, obtenerPlatos } from "../controllers/platos.controllers";

const router = Router();

router.route('/platos').get(obtenerPlatos).post(crearPlato);
//router.route('/platos/:id').delete(borrarTarea).put(editarTarea).get(obtenerUnaTarea);
export default router;
