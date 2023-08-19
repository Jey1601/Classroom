"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarParticipanteColeccion = void 0;
const participante_schema_1 = require("../models/participante.schema");
const agregarParticipanteColeccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoInstructor = req.body; // Asegúrate de que los campos coincidan con la interfaz Instructor
    try {
        const instructorGuardado = yield participante_schema_1.ParticipanteSchema.create(nuevoInstructor);
        res.send(instructorGuardado);
    }
    catch (error) {
        console.log('ERROR: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar el instructor', error });
    }
});
exports.agregarParticipanteColeccion = agregarParticipanteColeccion;
