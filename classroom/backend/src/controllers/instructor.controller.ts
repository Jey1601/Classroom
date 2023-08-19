import { Request,Response } from "express";
import { InstructorSchema } from "../models/instructor.schema";
import { Instructor } from "../models/instructor.model";


export const obtenerIntructor = async (req:Request, res:Response) => {
    const  instructor = await InstructorSchema.findOne({_id:req.params.id})

    if(instructor)
        res.send({status:true, message:'instructor obtenido con exito',instructor})
    else
        res.send({status:false, message:'instructor no existe'}) 
};

export const agregarIntructor =async (req:Request, res:Response) => {


    const nuevoInstructor: Instructor = req.body; // Asegúrate de que los campos coincidan con la interfaz Instructor

    try {
        const instructorGuardado = await InstructorSchema.create(nuevoInstructor);
        res.send(instructorGuardado);
    } catch (error) {
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

    
};


export const obtenerInstructores = (peticion: Request, respuesta: Response) => {
    InstructorSchema.find()
          .then((result:Array<Instructor>) => {
              respuesta.send(result);
              respuesta.end();
          })
          .catch((error:any) => console.error(error));
  }