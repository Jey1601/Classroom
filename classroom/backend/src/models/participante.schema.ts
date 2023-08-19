import mongoose from "mongoose";
import { Participante } from "./participante.model";


const schema = new mongoose.Schema<Participante>({
    
    nombre:String,
    imagen:String,
    clases:Array<mongoose.Types.ObjectId|null>
    
});

export const ParticipanteSchema=mongoose.model('participantes',schema);