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
exports.obtenerInstructores = exports.agregarIntructor = exports.obtenerIntructor = void 0;
const instructor_schema_1 = require("../models/instructor.schema");
const obtenerIntructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instructor = yield instructor_schema_1.InstructorSchema.findOne({ _id: req.params.id });
    if (instructor)
        res.send({ status: true, message: 'instructor obtenido con exito', instructor });
    else
        res.send({ status: false, message: 'instructor no existe' });
});
exports.obtenerIntructor = obtenerIntructor;
const agregarIntructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nuevoInstructor = req.body; // Asegúrate de que los campos coincidan con la interfaz Instructor
    try {
        const instructorGuardado = yield instructor_schema_1.InstructorSchema.create(nuevoInstructor);
        res.send(instructorGuardado);
    }
    catch (error) {
        console.log('ERROR: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar el instructor', error });
    }
    /* const instructor = new InstructorSchema(req.body);
     instructor.save().then((saveResponse:any) => {
       res.send(saveResponse);
       res.end();
     }).catch((error:any) => {
       console.log('ERRRORRR: ', error);
       res.send({message: 'Hubo un error al guardar', error}); // shorthand
       res.end();
     });
 
 
    /* try{
         const instructor = new InstructorSchema(req.body);  // Creamos el instructor que agregaremos a la colección
         const guardar= await instructor.save();
         res.send(guardar);
     }catch(error){
         console.log('error',error);
         res.send(500).send({message: 'Hubo un error al guardar', error});
     }*/
});
exports.agregarIntructor = agregarIntructor;
const obtenerInstructores = (peticion, respuesta) => {
    instructor_schema_1.InstructorSchema.find()
        .then((result) => {
        respuesta.send(result);
        respuesta.end();
    })
        .catch((error) => console.error(error));
};
exports.obtenerInstructores = obtenerInstructores;
