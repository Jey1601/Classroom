import mongoose from "mongoose";
import { Instructor } from "./instructor.model";


const schema = new mongoose.Schema<Instructor>({
    usuario:String,
    password:String,
    nombre:String,
    imagen:String,
    clases:Array<mongoose.Types.ObjectId|null>
    
});

export const InstructorSchema=mongoose.model('instructores',schema);