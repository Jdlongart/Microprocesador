import { Router } from 'express';
import { getInstrucciones, createInstruccion } from '../controllers/instruccionesController';

const router = Router();

router.get('/', getInstrucciones);
router.post('/', createInstruccion);

export default router;