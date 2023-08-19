import express from 'express';
import { agregarIntructor, obtenerIntructor, obtenerInstructores } from '../controllers/instructor.controller';


const router =express.Router();

//Obtener instructor
//http://localhost:3000/instructores/:id
router.get('/:id',obtenerIntructor);

// Obtener todos los intructores
//http://localhost:3000/instructores
router.get('/',obtenerInstructores);

//http://localhost:3000/instructores
router.post('/',agregarIntructor);

export default router;