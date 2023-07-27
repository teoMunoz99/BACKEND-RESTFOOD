import Usuario from "../models/usuario";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/token-sigin";

export const login = async (req, res) => {
    console.log(req.body);
    try {
        //verificar si existe un mail como el recibido
        const { email, contrasenia } = req.body;

        //verificar si el email ya existe
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            //si el usuario no existe
            return res.status(400).json({
                mensaje: "Correo o contrasenia invalido",
            });
        }
        // si no es valido el contrasenia
        const contraseniaValida = bcrypt.compareSync(contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            return res.status(400).json({
                mensaje: "Correo o contrasenia invalido",
            });
        }
        // Prueba de token
        const token = await generarJWT(usuario._id, usuario.nombreUsuario);
        //responder que el usuario es correcto
        res.status(200).json({
            mensaje: "El usuario existe",
            uid: usuario._id,
            nombre: usuario.nombreUsuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: "usuario o contraseña invalido",
        });
    }
};

export const crearUsuario = async (req, res) => {
    console.log(req.body);
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
        usuario.contrasenia = bcrypt.hashSync(req.body.contrasenia, saltos);
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

export const editarEstadoUsuario = async (req, res) => {
    try {
        const { email } = req.params;
        const { estado } = req.body;
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { email: email },
            { estado: estado }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
            });
        }

        res.status(200).json({
            mensaje: "El estado del usuario fue editado correctamente",
            usuario: usuarioActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al editar el estado",
        });
    }
};

export const crearPedido = async (req, res) => {
    try {
        const { email, pedido } = req.body;

        // Verificar si se proporcionó el "email" y los "pedidos"
        if (!email || !pedido || pedido.length === 0) {
            return res.status(400).json({
                mensaje: "Debe proporcionar el email y al menos un pedido",
            });
        }

        // Buscar al usuario por su email
        const usuarioPedido = await Usuario.findOneAndUpdate(
            { email: email },
            { pedido: pedido }
        );

        // Verificar si el usuario fue encontrado
        if (!usuarioPedido) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
            });
        }

        res.status(200).json({
            mensaje: "El pedido del usuario fue cargado correctamente",
            usuario: usuarioPedido,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al cargar el pedido",
        });
    }
};
