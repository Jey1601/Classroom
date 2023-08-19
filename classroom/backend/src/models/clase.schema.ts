import mongoose from "mongoose";
import { Anuncio, Asignacion, Clase } from "./clase.model";
import { BaseParticipante } from "./participante.model";

const schema = new mongoose.Schema<Clase>({
    nombreClase:String,
    seccion:String,
    banner:String,
    descripcion:String,
    aula:Number,
    asignaciones:Array<Asignacion>,
    anuncios:Array<Anuncio>,
    participantes:Array<mongoose.Types.ObjectId|null>,
})

export const ClaseSchema = mongoose.model('clases',schema);// enlace