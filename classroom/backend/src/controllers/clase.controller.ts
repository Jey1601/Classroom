import { Request, Response } from "express";
import { ClaseSchema } from "../models/clase.schema";
import { Participante } from "../models/participante.model";
import mongoose from "mongoose";


export const obtenerClase = async (req: Request, res: Response) => {
    const clase = await ClaseSchema.findById(req.params.id);

    if (clase)
        res.send({ status: true, message: 'clase obtenido con exito', clase })
    else
        res.send({ status: false, message: 'clase no existe' })
};



export const agregarComentarioAnuncio = async (req: Request, res: Response) => {

    try {
        ClaseSchema.updateOne({ _id: req.params.id },
            {
                $push: {
                    [`anuncios.${req.params.anuncioIndex}.comentarios`]: req.body
                }
            }

        ).then((result: any) => {
            res.send(result);
            res.end();
        }).catch((error: any) => console.log(error));


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }





};


export const obtenerAnuncios = async (req: Request, res: Response) => {
    const clase = await ClaseSchema.findById(req.params.id);

    if (clase)
        res.send({ status: true, message: 'anuncios obtenenidos con exito', anuncios: clase.anuncios })
    else
        res.send({ status: false, message: 'clase no existe ' })
};


export const obtenerComentariosAnuncio = async (req: Request, res: Response) => {

    const clase = await ClaseSchema.findById(req.params.id);

    if (clase) {
        const index = parseInt(req.params.anuncioIndex);
        const comentarios = clase.anuncios[index].comentarios;

        res.send({ status: true, message: 'comentarios obtenenidos con exito', comentarios })
    } else
        res.send({ status: false, message: 'clase no existe ' })



};


export const obtenerAsignaciones = async (req: Request, res: Response) => {
    const clase = await ClaseSchema.findById(req.params.id);

    if (clase)
        res.send({ status: true, message: 'asignaciones obtenenidas con exito', asignaciones: clase.asignaciones })
    else
        res.send({ status: false, message: 'clase no existe ' })
};

export const obtenerParticipantes = async (req: Request, res: Response) => {

    try {
        const claseId = req.params.id;
        const result = await ClaseSchema.aggregate([
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
                    _id: new mongoose.Types.ObjectId(claseId),
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

export const agregarParticipante = async (req: Request, res: Response) => {

    ClaseSchema.updateOne({ _id: req.params.id },
        {
            $push: {
                participantes:( new mongoose.Types.ObjectId(req.body.id)) //Enviar como cadena el id
                
            }
        }
    ).then(result => {
        res.send({ message: 'Participante  agregado agregado', result });
        res.end();
    }).catch(error => {
        res.send({ message: 'Ocurrio un error', error });
        res.end();
    })




};