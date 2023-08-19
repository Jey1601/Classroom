import express, {Request,Response,Express} from 'express';
import { Database } from './utils/database';
import IntructorRouter  from './routers/instructor.router'
import ClaseRouter  from './routers/clase.router'
import ParticipanteRouter  from './routers/participante.router'
import mongoose from 'mongoose';
import cors from 'cors';

const app:Express =express();
const db:Database= new Database();



app.use(express.json());
app.use(cors());
app.use('/instructores',IntructorRouter);
app.use('/clases',ClaseRouter);
app.use('/participantes',ParticipanteRouter);

app.get('/',(req:Request, res:Response)=>{
    res.send('Backend de classroom');
    res.end();
})


app.listen('3000',()=>{
    console.log('server is runnign at http://localhost:3000')
})