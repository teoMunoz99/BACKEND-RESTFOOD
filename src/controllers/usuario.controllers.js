import Usuario from "../models/usuario";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try {
        //verificar si existe un mail como el recibido
        const { email, contrasenia } = req.body;

        //verificar si el email ya existe
        let usuario = await Usuario.findOne({ email }); //devulve un null
        if (!usuario) {
            //si el usuario no existe
            return res.status(400).json({
                mensaje: "Correo o contrasenia invalido - correo",
            });
        }
        // si no es valido el contrasenia
        const contraseniaValida = bcrypt.compareSync(contrasenia, usuario.contrasenia); // devulve un valor booleano
        if (!contraseniaValida) {
            return res.status(400).json({
                mensaje: "Correo o contrasenia invalido - contrasenia",
            });
        }
        //responder que el usuario es correcto
        res.status(200).json({
            mensaje: "El usuario existe",
            uid: usuario._id,
            nombre: usuario.nombreUsuario,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "usuario o contraseña invalido",
        });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const { email } = req.body;

        //verificar si el email ya existe
        let usuario = await Usuario.findOne({ email }); //devulve un null
        console.log(usuario);
        if (usuario) {
            //si el usuario existe
            return res.status(400).json({
                mensaje: "ya existe un usuario con el correo enviado",
            });
        }
        //guardamos el nuevo usuario en la BD
        usuario = new Usuario(req.body);
        //edito el usuario para encriptar la contraseña
        const saltos = bcrypt.genSaltSync(10);
        usuario.contrasenia = bcrypt.hashSync(req.body.contrasenia, saltos)
        await usuario.save();
        res.status(201).json({
            mensaje: "usuario creado",
            nombre: usuario.nombre,
            uid: usuario._id,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "El usuario no pudo ser creado",
        });
    }
};

export const listarUsuarios = async (req, res) => {
    // res.send("esto es una prueba de una peticion get");
    try {
        //buscar en la BD la collection de productos
        const usuarios = await Usuario.find();
        //envio la respuesta al frontend
        res.status(200).json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al buscar los usuarios",
        });
    }
};