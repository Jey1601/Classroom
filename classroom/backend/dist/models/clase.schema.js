"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaseSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    nombreClase: String,
    seccion: String,
    banner: String,
    descripcion: String,
    aula: Number,
    asignaciones: (Array),
    anuncios: (Array),
    participantes: (Array),
});
exports.ClaseSchema = mongoose_1.default.model('clases', schema); // enlace
