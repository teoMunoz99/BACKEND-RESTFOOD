import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import './src/database/dbConnection';

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), ()=>{
    console.log('Puerto:'+ app.get("port"));
})


//middlewares
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); //permite en el objeto request los strings y arrays
app.use(morgan('dev')); //nos da una info extra en la terminal

//rutas

app.get('/prueba', (req,res)=>{
    res.send('esto es una prueba de la peticion GET a mi backend')
})