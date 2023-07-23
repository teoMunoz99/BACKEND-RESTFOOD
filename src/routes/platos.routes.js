import { Router} from "express";
import { crearPlato, obtenerPlatos, borrarUnPlato } from "../controllers/platos.controllers";

const router = Router();

router.route('/platos').get(obtenerPlatos).post(crearPlato);
router.route('/platos/:id').delete(borrarUnPlato);
//.put(editarTarea).get(obtenerUnaTarea);
export default router;
