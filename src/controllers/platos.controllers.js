import Plato from "../models/plato"


//controlador para obtener tareas
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

//controlador para crear una tarea 
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

/*//controlador para borrar una tarea 

export const borrarTarea = async (req,res)=>{
    try {
        //obtener el id y luego solicitar a moongoose el borrar
        console.log(req.params.id)
        await Tarea.findByIdAndDelete(req.params.id);
        res.status(200).json({
            mensaje: 'La tarea fue borrada'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al borrar la tarea'
        })
    }
}

//controlador para editar una tarea

export const editarTarea = async (req,res)=>{
    try {
        //extraer el id del request y el body
        await Tarea.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json({
            mensaje: "La tarea fue editada correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al editar la tarea'
        })
    }
}

//controlador para obtener una tarea
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