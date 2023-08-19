"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clase_controller_1 = require("../controllers/clase.controller");
const router = express_1.default.Router();
//Endpoint para obtener una clase 
//https://localhost:3000/clases/:id
router.get('/:id', clase_controller_1.obtenerClase);
//Endpoint para agregar comentario a una clase
//https://localhost:3000/clases/:id/anuncios/:anuncioIndex
router.post('/:id/anuncios/:anuncioIndex', clase_controller_1.agregarComentarioAnuncio);
//Endpoint para obtener los anuncios de una clase
//https://localhost:3000/clases/:id/anuncios
router.get('/:id/anuncios', clase_controller_1.obtenerAnuncios);
//Endpoint para obtener los comentarios de un anuncio de una clase
//https://localhost:3000/clases/:id/anuncios/:anuncioIndex
router.get('/:id/anuncios/:anuncioIndex', clase_controller_1.obtenerComentariosAnuncio);
//Endpoint para obtener las asignaciones de una clase
//https://localhost:3000/clases/:id/asignaciones
router.get('/:id/asignaciones', clase_controller_1.obtenerAsignaciones);
//Endpoint para obtener los participanes de una clase
//https://localhost:3000/clases/:id/participantes
router.get('/:id/participantes', clase_controller_1.obtenerParticipantes);
//Endpoint para agregar un participante a una clase
//https://localhost:3000/clases/:id/participantes
router.post('/:id/participantes', clase_controller_1.agregarParticipante);
exports.default = router;
