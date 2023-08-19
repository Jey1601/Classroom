import { Request,Response } from "express";
import { Participante } from "../models/participante.model";
import { ParticipanteSchema } from "../models/participante.schema";


export const agregarParticipanteColeccion =async (req:Request, res:Response) => {


    const nuevoInstructor: Participante = req.body; // Asegúrate de que los campos coincidan con la interfaz Instructor

    try {
        const instructorGuardado = await ParticipanteSchema.create(nuevoInstructor);
        res.send(instructorGuardado);
    } catch (error) {
        console.log('ERROR: ', error);
        res.status(500).send({ message: 'Hubo un error al guardar el instructor', error });
    }

};
