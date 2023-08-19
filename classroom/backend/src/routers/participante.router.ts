import express from 'express';
import { agregarParticipanteColeccion } from '../controllers/participante.controller';



const router =express.Router();

//http://localhost:3000/participantes
router.post('/',agregarParticipanteColeccion);

export default router;