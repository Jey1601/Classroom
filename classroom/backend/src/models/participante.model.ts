import mongoose from "mongoose";
import { BaseClase } from "./clase.model";

export interface BaseParticipante{
    _id?:mongoose.Types.ObjectId;
    nombre:string;
    imagen:string;
}

export interface Participante extends BaseParticipante{
    clases:Array<BaseClase>;
}