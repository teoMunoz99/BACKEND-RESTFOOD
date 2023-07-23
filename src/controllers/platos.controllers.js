import Plato from "../models/plato"


//controlador para obtener todos los platos
export const obtenerPlatos = async (req, res)=>{
    try{
        const platos = await Plato.find();
        res.status(200).json(platos);
    }catch(error){
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al buscar los platos'
        })
    }
}

//controlador para crear un plato 
export const crearPlato = async (req, res)=>{
    try{
        console.log(req.body);
        const platoNuevo = new Plato(req.body);
        await platoNuevo.save();
        res.status(201).json({
            mensaje: 'El plato fue creado correctamente'
        })
   }catch(error){
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al crear el plato'
        })
    }
}

//controlador para borrar un plato 

export const borrarUnPlato = async (req,res)=>{
    try {
        //obtener el id y luego solicitar a moongoose el borrar
        await Plato.findByIdAndDelete(req.params.id);
        res.status(200).json({
            mensaje: 'El plato fue borrado'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al borrar el plato'
        })
    }
}

//controlador para editar un plato

export const editarPlato = async (req,res)=>{
    try {
        //extraer el id del request y el body
        await Plato.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            mensaje: "El plato fue editado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al editar el plato'
        })
    }
}

/*//controlador para obtener una tarea
export const obtenerUnaTarea = async (req, res)=>{
    try{
        const tarea = await Tarea.findById(req.params.id);
        res.status(200).json(tarea);
    }catch(error){
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al buscar las tareas'
        })
    }
}*/