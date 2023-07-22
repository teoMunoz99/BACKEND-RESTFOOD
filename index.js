import express from 'express';

//configuro el puerto-creo la instancia
const app = express();

app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), ()=>{
    console.log('Puerto:'+ app.get("port"));
})