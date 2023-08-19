import express from 'express';
import { agregarComentarioAnuncio, agregarParticipante, obtenerAnuncios, obtenerAsignaciones, obtenerClase, obtenerComentariosAnuncio, obtenerParticipantes } from '../controllers/clase.controller';


const router =express.Router();

//Endpoint para obtener una clase 
//https://localhost:3000/clases/:id
router.get('/:id',obtenerClase);

//Endpoint para agregar comentario a una clase
//https://localhost:3000/clases/:id/anuncios/:anuncioIndex
router.post('/:id/anuncios/:anuncioIndex',agregarComentarioAnuncio)


//Endpoint para obtener los anuncios de una clase
//https://localhost:3000/clases/:id/anuncios
router.get('/:id/anuncios', obtenerAnuncios)

//Endpoint para obtener los comentarios de un anuncio de una clase
//https://localhost:3000/clases/:id/anuncios/:anuncioIndex
router.get('/:id/anuncios/:anuncioIndex',obtenerComentariosAnuncio)

//Endpoint para obtener las asignaciones de una clase
//https://localhost:3000/clases/:id/asignaciones
router.get('/:id/asignaciones',obtenerAsignaciones)

//Endpoint para obtener los participanes de una clase
//https://localhost:3000/clases/:id/participantes
router.get('/:id/participantes',obtenerParticipantes)

//Endpoint para agregar un participante a una clase
//https://localhost:3000/clases/:id/participantes
router.post('/:id/participantes',agregarParticipante);




export default router;