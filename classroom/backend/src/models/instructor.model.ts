import mongoose from "mongoose";

export interface Instructor{
    _id?:mongoose.Types.ObjectId;
    usuario:string;
    password:string;
    nombre:string;
    imagen:string;
    clases:Array<mongoose.Types.ObjectId|null>;
}