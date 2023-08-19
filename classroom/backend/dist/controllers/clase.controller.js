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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarParticipante = exports.obtenerParticipantes = exports.obtenerAsignaciones = exports.obtenerComentariosAnuncio = exports.obtenerAnuncios = exports.agregarComentarioAnuncio = exports.obtenerClase = void 0;
const clase_schema_1 = require("../models/clase.schema");
const mongoose_1 = __importDefault(require("mongoose"));
const obtenerClase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clase = yield clase_schema_1.ClaseSchema.findById(req.params.id);
    if (clase)
        res.send({ status: true, message: 'clase obtenido con exito', clase });
    else
        res.send({ status: false, message: 'clase no existe' });
});
exports.obtenerClase = obtenerClase;
const agregarComentarioAnuncio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        clase_schema_1.ClaseSchema.updateOne({ _id: req.params.id }, {
            $push: {
                [`anuncios.${req.params.anuncioIndex}.comentarios`]: req.body
            }
        }).then((result) => {
            res.send(result);
            res.end();
        }).catch((error) => console.log(error));
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});
exports.agregarComentarioAnuncio = agregarComentarioAnuncio;
const obtenerAnuncios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clase = yield clase_schema_1.ClaseSchema.findById(req.params.id);
    if (clase)
        res.send({ status: true, message: 'anuncios obtenenidos con exito', anuncios: clase.anuncios });
    else
        res.send({ status: false, message: 'clase no existe ' });
});
exports.obtenerAnuncios = obtenerAnuncios;
const obtenerComentariosAnuncio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clase = yield clase_schema_1.ClaseSchema.findById(req.params.id);
    if (clase) {
        const index = parseInt(req.params.anuncioIndex);
        const comentarios = clase.anuncios[index].comentarios;
        res.send({ status: true, message: 'comentarios obtenenidos con exito', comentarios });
    }
    else
        res.send({ status: false, message: 'clase no existe ' });
});
exports.obtenerComentariosAnuncio = obtenerComentariosAnuncio;
const obtenerAsignaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clase = yield clase_schema_1.ClaseSchema.findById(req.params.id);
    if (clase)
        res.send({ status: true, message: 'asignaciones obtenenidas con exito', asignaciones: clase.asignaciones });
    else
        res.send({ status: false, message: 'clase no existe ' });
});
exports.obtenerAsignaciones = obtenerAsignaciones;
const obtenerParticipantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claseId = req.params.id;
        const result = yield clase_schema_1.ClaseSchema.aggregate([
            {
                $lookup: {
                    from: 'participantes',
                    localField: 'participantes',
                    foreignField: '_id',
                    as: 'detallesParticipantes',
                },
            },
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(claseId),
                },
            },
            {
                $project: {
                    detallesParticipantes: true,
                    _id: false,
                },
            },
        ]).exec();
        res.json(result);
        //res.send(result);
        res.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.obtenerParticipantes = obtenerParticipantes;
const agregarParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    clase_schema_1.ClaseSchema.updateOne({ _id: req.params.id }, {
        $push: {
            participantes: (new mongoose_1.default.Types.ObjectId(req.body.id)) //Enviar como cadena el id
        }
    }).then(result => {
        res.send({ message: 'Participante  agregado agregado', result });
        res.end();
    }).catch(error => {
        res.send({ message: 'Ocurrio un error', error });
        res.end();
    });
});
exports.agregarParticipante = agregarParticipante;
