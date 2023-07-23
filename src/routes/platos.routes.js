import { Router} from "express";
import { crearPlato, obtenerPlatos, borrarUnPlato, editarPlato } from "../controllers/platos.controllers";

const router = Router();

router.route('/platos').get(obtenerPlatos).post(crearPlato);
router.route('/platos/:id').delete(borrarUnPlato).put(editarPlato);
//.put(editarPlato).get(obtenerUnaTarea);
export default router;
