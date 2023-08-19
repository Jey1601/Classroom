import mongoose from "mongoose";
import { BaseParticipante } from "./participante.model";

export interface Asignacion{
    id:number;
    titulo: string;
    fecha:string;
    hora:string;
    puntos:number;
}

export interface Comentario{
    usuario:string;
    mensaje:string;
    fecha:string;
    hora:string;
}

export interface Anuncio{
    id:number;
    mensaje:string;
    fecha:string;
    hora:string;
    comentarios: Array<Comentario>;
}

export interface BaseClase{
    _id?:mongoose.Types.ObjectId;
    nombreClase:string;
}

export interface Clase extends BaseClase{
   
    seccion:string;
    banner:string;
    descripcion:string;
    aula:number;
    asignaciones:Array<Asignacion>;
    anuncios:Array<Anuncio>;
    participantes?:Array<BaseParticipante>;
}