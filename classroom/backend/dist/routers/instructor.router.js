"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instructor_controller_1 = require("../controllers/instructor.controller");
const router = express_1.default.Router();
//Obtener instructor
//http://localhost:3000/instructores/:id
router.get('/:id', instructor_controller_1.obtenerIntructor);
// Obtener todos los intructores
//http://localhost:3000/instructores
router.get('/', instructor_controller_1.obtenerInstructores);
//http://localhost:3000/instructores
router.post('/', instructor_controller_1.agregarIntructor);
exports.default = router;
