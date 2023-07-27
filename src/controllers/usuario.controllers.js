import Usuario from "../models/usuario";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Correo o contrasenia invalido",
      });
    }
    const contraseniaValida = bcrypt.compareSync(
      contrasenia,
      usuario.contrasenia
    );
    if (!contraseniaValida) {
      return res.status(400).json({
        mensaje: "Correo o contrasenia invalido",
      });
    }
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

    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        mensaje: "Ya existe un usuario con el correo enviado",
      });
    }

    usuario = new Usuario(req.body);
    const saltos = bcrypt.genSaltSync(10);
    usuario.contrasenia = bcrypt.hashSync(req.body.contrasenia, saltos);
    await usuario.save();
    res.status(201).json({
      mensaje: "Usuario creado",
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

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar los usuarios",
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar el usuario",
    });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "El usuario fue editado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al editar el usuario",
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

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
      usuario: usuarioEliminado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al eliminar el usuario",
    });
  }
};

export const crearPedido = async (req, res) => {
  try {
    const { email, pedido } = req.body;

    if (!email || !pedido || pedido.length === 0) {
      return res.status(400).json({
        mensaje: "Debe proporcionar el email y al menos un pedido",
      });
    }

    const usuarioPedido = await Usuario.findOneAndUpdate(
      { email: email },
      { pedido: pedido }
    );

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
