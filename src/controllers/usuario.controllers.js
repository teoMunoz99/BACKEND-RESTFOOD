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

    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      imagen: usuario.imagen,
      estado: usuario.estado,
      pedidos: usuario.pedidos,
      carrito: usuario.carrito,
      favoritos: usuario.favoritos,
      estado: usuario.estado,
      rol: usuario.rol,
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
    await usuario.save();
    res.status(201).json({
      status: usuario.status,
      contrasenia: usuario.contrasenia,
      usuario: usuario.nombre,
      email: usuario.email,
      imagen: usuario.imagen,
      estado: usuario.estado,
      rol: usuario.rol,
      pedidos: usuario.pedidos,
      carrito: usuario.carrito,
      favoritos: usuario.favoritos,
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
    const { id } = req.params;
    const { estado } = req.body;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    usuario.estado = estado;

    await usuario.save();
    res.status(200).json({
      mensaje: "El estado del usuario fue editado correctamente",
      usuario: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al editar el estado del usuario",
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

export const agregarFavoritos = async (req, res) => {
  const { usuarioID } = req.params;
  const { nuevofavoritos } = req.body;
  try {
    const usuario = await Usuario.findById(usuarioID);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const existe = usuario.favoritos.includes(nuevofavoritos);

    if (!existe) {
      usuario.favoritos.push(nuevofavoritos);
    } else {
      usuario.favoritos = usuario.favoritos.filter(
        (fav) => fav !== nuevofavoritos
      );
    }

    await usuario.save();

    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al agregar a favoritos",
    });
  }
};

export const agregarPedidos = async (usuarioID, datos) => {
  try {
    const usuario = await Usuario.findById(usuarioID);

    if (!usuario) {
      throw new Error("Usuario no encontrado.");
    }

    if (usuario.carrito.length === 0) {
      throw new Error("No hay productos en el carrito.");
    }

    const pedidoActual = usuario.pedidos || [];
    pedidoActual.push(datos);
    usuario.pedidos = pedidoActual;

    usuario.carrito = [];

    await usuario.save();

    return usuario.pedidos;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const actualizarPedidos = async (req, res) => {
  try {
    const { usuarioID, pedidoID, estado } = req.body;

    const usuario = await Usuario.findById(usuarioID);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    const pedidoActual = usuario.pedidos || [];

    const pedidoActualizar = pedidoActual.find(
      (pedido) => pedido._id === pedidoID
    );

    if (!pedidoActualizar) {
      return res.status(404).json({ mensaje: "Pedido no encontrado." });
    }

    pedidoActualizar.estado = estado;

    await usuario.save();

    res.status(200).json({
      mensaje: "Pedido actualizado exitosamente",
      pedidos: usuario.pedidos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error al actualizar el pedido." });
  }
};

export const agregarProductoAlCarrito = async (req, res) => {
  try {
    const { usuarioID, productoID, nuevoProducto } = req.body;

    const usuario = await Usuario.findById(usuarioID);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    const carritoActual = usuario.carrito || [];
    const productoExistente = carritoActual.find(
      (producto) =>
        producto._id === productoID && producto.precio === nuevoProducto.precio
    );

    if (productoExistente) {
      productoExistente.cantidad += nuevoProducto.cantidad;
    } else {
      carritoActual.push(nuevoProducto);
    }

    usuario.carrito = carritoActual;

    await usuario.save();

    res.status(200).json({
      mensaje: "Producto agregado al carrito exitosamente",
      carrito: usuario.carrito,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Hubo un error al agregar el producto al carrito." });
  }
};

export const actualizarStock = async (req, res) => {
  try {
    const { usuarioID, productos } = req.body;

    const usuario = await Usuario.findById(usuarioID);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    const carritoActual = usuario.carrito || [];

    productos.forEach((producto) => {
      const productoExistente = carritoActual.find(
        (producto) => producto._id === producto._id
      );

      if (productoExistente) {
        productoExistente.stock = producto.stock;
      }
    });

    usuario.carrito = carritoActual;

    await usuario.save();

    res.status(200).json({
      mensaje: "Stock actualizado exitosamente",
      carrito: usuario.carrito,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error al actualizar el stock." });
  }
};
